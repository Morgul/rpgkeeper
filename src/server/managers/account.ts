// ---------------------------------------------------------------------------------------------------------------------
// Account Manager
// ---------------------------------------------------------------------------------------------------------------------

// Managers
import { table } from './database';

// Models
import { Account } from '../models/account';

// Errors
import { MultipleResultsError, NotFoundError } from '../errors';

// Utils
import { shortID } from '../utils/misc';

// ---------------------------------------------------------------------------------------------------------------------

export interface AccountFilters {
    id : unknown,
    email : unknown,
    name : unknown
}

// ---------------------------------------------------------------------------------------------------------------------

export async function list(filters : AccountFilters) : Promise<Account[]>
{
    const query = table('account')
        .select(
            'hash_id as id',
            'email',
            'name',
            'avatar',
            'permissions',
            'settings'
        );

    if(filters.id)
    {
        query.where({ hash_id: filters.id });
    } // end if

    if(filters.email)
    {
        query.where({ email: filters.email });
    } // end if

    if(filters.name)
    {
        query.where({ name: filters.name });
    } // end if

    return (await query).map(Account.fromDB);
} // end list

export async function getGroups(accountID : string) : Promise<string[]>
{
    const roles = await table('account as ac')
        .select('r.name as name', 'r.role_id as id')
        .join('account_role as ar', 'ac.account_id', '=', 'ar.account_id')
        .join('role as r', 'ar.role_id', '=', 'r.role_id')
        .where({
            'ac.hash_id': accountID
        });

    return roles.map((role) => role.name);
} // end getGroups

export async function getRaw(accountID : string) : Promise<Record<string, unknown>>
{
    const accounts = await table('account')
        .select(
            'account_id',
            'hash_id as id',
            'email',
            'name',
            'avatar',
            'permissions',
            'settings'
        )
        .where({
            hash_id: accountID
        });

    if(accounts.length > 1)
    {
        throw new MultipleResultsError('account');
    }
    else if(accounts.length === 0)
    {
        throw new NotFoundError(`No account record found for account '${ accountID }'.`);
    }
    else
    {
        const groups = await getGroups(accountID);
        return { ...accounts[0], groups };
    } // end if
} // end getRaw

export async function get(accountID : string) : Promise<Account>
{
    const { account_id, ...restAccount } = await getRaw(accountID);
    return Account.fromDB(restAccount);
} // end get

export async function getByEmail(email : string) : Promise<Account>
{
    const accounts = await table('account')
        .select(
            'hash_id as id',
            'email',
            'name',
            'avatar',
            'permissions',
            'settings'
        )
        .where({ email });

    if(accounts.length > 1)
    {
        throw new MultipleResultsError('account');
    }
    else if(accounts.length === 0)
    {
        throw new NotFoundError(`No account record found with email '${ email }'.`);
    }
    else
    {
        const groups = await getGroups(accounts[0].id);
        return Account.fromDB({ ...accounts[0], groups });
    } // end if
} // end getByEmail

export async function add(newAccount : Record<string, unknown>) : Promise<Account>
{
    const account = Account.fromJSON({ ...newAccount, id: shortID(), created: Date.now() });
    await table('account')
        .insert(account.toDB());

    return get(account.id);
} // end add

export async function update(accountID : string, accountUpdate : Record<string, unknown>) : Promise<Account>
{
    // Get the current account
    const account = await get(accountID);

    // Mix the current account with the allowed updates.
    const allowedUpdate = {
        ...account.toJSON(),
        name: accountUpdate.name ?? account.name,
        avatar: accountUpdate.avatar ?? account.avatar,
        settings: accountUpdate.settings ?? account.settings
    };

    // Make a new account object
    const newAccount = Account.fromJSON(allowedUpdate);

    // Update the database
    await table('account')
        .update(newAccount.toDB())
        .where({ hash_id: accountID });

    // Return the updated record
    return get(accountID);
} // end update

export async function remove(accountID : string) : Promise<{ status : 'ok' }>
{
    await table('account')
        .where({ hash_id: accountID })
        .delete();

    return { status: 'ok' };
} // end delete

// ---------------------------------------------------------------------------------------------------------------------
