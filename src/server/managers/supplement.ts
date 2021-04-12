//----------------------------------------------------------------------------------------------------------------------
// SupplementManager
//----------------------------------------------------------------------------------------------------------------------

import { QueryBuilder } from 'knex';
import logging from 'trivial-logging';

// Managers
import { table } from './database';
import * as accountMan from './account';
import * as permMan from './permissions';

// Models
import { Account } from '../models/account';
import { Supplement } from '../models/supplement';

// Utilities
import { applyFilters } from '../knex/utils';
import { FilterToken } from '../routes/utils/query';
import { camelCaseKeys } from '../utils/misc';

// Errors
import { MultipleResultsError, DuplicateSupplementError, NotFoundError, NotAuthorizedError } from '../errors';

//----------------------------------------------------------------------------------------------------------------------

const logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

async function $checkViewAccess(query : QueryBuilder, systemPrefix ?: string, account ?: Account) : Promise<QueryBuilder>
{
    if(account && systemPrefix)
    {
        // Generally, this is just going to be admins; but hey, why not let admins see everything?
        if(!permMan.hasPerm(account, `${ systemPrefix }/canViewContent`))
        {
            // FIXME: This hack should be removed, and `hash_id` should be the foreign_key
            const { account_id } = await accountMan.getRaw(account.id);

            // Add scoping in
            query = query.where(function()
            {
                this.where({ scope: 'public' }).orWhere({ scope: 'user', owner: account_id });
            });
        } // end if
    } // end if

    return query;
} // end $checkViewAccess

async function $checkModAccess(supplement : Supplement, systemPrefix : string, type : string, account ?: Account) : Promise<void>
{
    if(account)
    {
        // Check if we have permission to remove
        const hasRight = permMan.hasPerm(account, `${ systemPrefix }/canModifyContent`);
        const isOwner = supplement.scope === 'user' && account.id === supplement.owner;
        if(!hasRight && !isOwner)
        {
            throw new NotAuthorizedError('modify', `${ systemPrefix }/${ type }/${ supplement.name }/${ supplement.id }`);
        } // end if
    } // end if
} // end $checkModAccess

async function $ensureCorrectOwner(supplement : Supplement, systemPrefix ?: string, account ?: Account) : Promise<Supplement>
{
    if(account && systemPrefix)
    {
        // If we're not an admin user, and therefore allowed to add/edit content for other people, we have to make sure
        // that the owner is set to the account making this call. (Assuming one was passed in, of course.)
        if(supplement.scope === 'user' && (!supplement.owner || !permMan.hasPerm(account, `${ systemPrefix }/canModifyContent`)))
        {
            supplement.owner = account.id;
        } // end if

        if(supplement.scope === 'public')
        {
            supplement.owner = undefined;
        } // end if
    } // end if

    return supplement;
} // end $ensureCorrectOwner

//----------------------------------------------------------------------------------------------------------------------

export async function get(id : number, type : string, systemPrefix : string, account ?: Account) : Promise<Supplement>
{
    const tableName = `${ systemPrefix }_${ type }`;
    const query = table(`${ tableName } as t`)
        .select('t.*', 'a.hash_id as ownerHash')
        .leftJoin('account as a', 'a.account_id', '=', 't.owner')
        .where({ id });

    // Handle retrieval
    const supplements = await $checkViewAccess(query, systemPrefix, account);
    if(supplements.length > 1)
    {
        throw new MultipleResultsError(type);
    }
    else if(supplements.length === 0)
    {
        throw new NotFoundError(`No ${ type } with id '${ id }' found.`);
    }
    else
    {
        const { ownerHash, ...restSupp } = supplements[0];
        return Supplement.fromDB(systemPrefix, type, { ...camelCaseKeys(restSupp), owner: ownerHash });
    } // end if
} // end get

export async function list(filters : Record<string, FilterToken>, type : string, systemPrefix : string, account ?: Account) : Promise<Supplement[]>
{
    const tableName = `${ systemPrefix }_${ type }`;
    let query = table(`${ tableName } as t`)
        .select('t.*', 'a.hash_id as ownerHash')
        .leftJoin('account as a', 'a.account_id', '=', 't.owner');

    // Add filters for only what we have access to
    query = await $checkViewAccess(query, systemPrefix, account);

    // Apply any filters
    query = applyFilters(query, filters);

    return (await query).map((supp) =>
    {
        const { ownerHash, ...restSupp } = supp;
        return Supplement.fromDB(systemPrefix, type, { ...camelCaseKeys(restSupp), owner: ownerHash });
    });
} // end list

export async function exists(id : number, type : string, systemPrefix : string, account ?: Account) : Promise<boolean>
{
    // If you're paying attention, you'll realize we also return 'undefined' (and hence false for existence) if there's
    // a duplicate. This is fine, it means the DB is somehow screwed, so all bets are off, better to err on the side of
    // saying this doesn't exist, rather than allowing for it to be referenced.
    const supp = await get(id, type, systemPrefix, account).catch(() => undefined);

    // We only need a boolean.
    return !!supp;
} // end exists

export async function add(newSupplement : Record<string, unknown>, type : string, systemPrefix : string, account ?: Account) : Promise<Supplement>
{
    const tableName = `${ systemPrefix }_${ type }`;
    const supplement = Supplement.fromJSON(systemPrefix, type, newSupplement);

    // Ensure the supplement's ownership is valid.
    await $ensureCorrectOwner(supplement, systemPrefix, account);

    // Make sure we have permission to modify
    await $checkModAccess(supplement, systemPrefix, type, account);

    // First, we check to see if we already have one that matches the unique constraint. We do this manually, because
    // it's very hard to catch specific sqlite errors reliably, so we do the check explicitly.
    const suppExists = (await table(tableName)
        .select()
        .where({ scope: supplement.scope, owner: supplement.owner, name: supplement.name })).length > 0;

    if(suppExists)
    {
        logger.warn('Attempted to add supplement with the same name, scope and owner as an existing one:', logger.dump(supplement.toJSON()));
        throw new DuplicateSupplementError(`${ systemPrefix }/${ type }/${ supplement.name }`);
    } // end if

    // =====================================================================================
    // FIXME: This hack should be removed, and `hash_id` should be the foreign_key

    let owner;
    if(supplement.scope === 'user' && supplement.owner)
    {
        const { account_id } = await accountMan.getRaw(supplement.owner);
        owner = account_id;
    } // end if

    // =====================================================================================

    // Now, we insert the supplement
    const [ id ] = await table(tableName).insert({ ...supplement.toDB(), owner });

    // Return the inserted supplement
    return get(id, type, systemPrefix, account);
} // end add

export async function update(id : number, updateSup : Record<string, unknown>, type : string, systemPrefix : string, account ?: Account) : Promise<Supplement>
{
    const supplement = await get(id, type, systemPrefix, account);
    const tableName = `${ systemPrefix }_${ type }`;

    // Mix the current character with the allowed updates. Note: because we don't know what properties to allow to be
    // updatable, we assume everything but ID is. Instead of trying to destructure just id out, we apply everything,
    // and re-apply id. It's less efficient, but more explicit.
    const allowedUpdate = {
        ...supplement.toJSON(),
        ...updateSup,
        id
    };

    // Make a new character object
    const newSupplement = Supplement.fromJSON(systemPrefix, type, allowedUpdate);

    // Ensure the supplement's ownership is valid.
    await $ensureCorrectOwner(supplement, systemPrefix, account);

    // Make sure we have permission to modify
    await $checkModAccess(newSupplement, systemPrefix, type, account);

    // =====================================================================================
    // FIXME: This hack should be removed, and `hash_id` should be the foreign_key

    let owner;
    if(newSupplement.scope === 'user' && newSupplement.owner)
    {
        const { account_id } = await accountMan.getRaw(newSupplement.owner);
        owner = account_id;
    } // end if

    // =====================================================================================

    // Now, we update the supplement
    await table(tableName)
        .update({ ...newSupplement.toDB(), owner })
        .where({ id });

    // Return the updated supplement
    return get(id, type, systemPrefix, account);
} // end update

export async function remove(id : number, type : string, systemPrefix : string, account ?: Account) : Promise<{ status : 'ok' }>
{
    const supplement = await get(id, type, systemPrefix, account).catch(() => undefined);
    const tableName = `${ systemPrefix }_${ type }`;

    if(supplement)
    {
        // Make sure we have permission to modify
        await $checkModAccess(supplement, systemPrefix, type, account);

        // Delete the supplement
        await table(tableName)
            .delete()
            .where({ id });
    } // end if

    return { status: 'ok' };
} // end remove

//----------------------------------------------------------------------------------------------------------------------
