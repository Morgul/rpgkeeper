//----------------------------------------------------------------------------------------------------------------------
// CharacterManager
//----------------------------------------------------------------------------------------------------------------------

// Managers
import { table } from './database';
import * as accountMan from './account';
import * as notebookMan from './notebook';
import systemMan from './system';

// Models
import { Character } from '../models/character';

// Utils
import { MultipleResultsError, NotFoundError } from '../errors';
import { FilterToken } from '../routes/utils/query';
import { applyFilters } from '../knex/utils';
import { shortID } from '../utils/misc';
import { broadcast } from '../utils/sio';

//----------------------------------------------------------------------------------------------------------------------

export async function get(id : string) : Promise<Character>
{
    const characters = await table('character as char')
        .select(
            'char.hash_id as id',
            'char.system',
            'char.name',
            'char.description',
            'char.portrait',
            'char.thumbnail',
            'char.color',
            'char.campaign',
            'char.details',
            'acc.hash_id as accountID',
            'note.hash_id as noteID'
        )
        .join('note', 'note.note_id', '=', 'char.note_id')
        .join('account as acc', 'acc.account_id', '=', 'char.account_id')
        .where({ 'char.hash_id': id });

    if(characters.length > 1)
    {
        throw new MultipleResultsError('character');
    }
    else if(characters.length === 0)
    {
        throw new NotFoundError(`No character with id '${ id }' found.`);
    }
    else
    {
        const char = Character.fromDB(characters[0]);
        return systemMan.validateCharacterDetails(char);
    } // end if
} // get

export async function list(filters : Record<string, FilterToken> = {}) : Promise<Character[]>
{
    let query = table('character as char')
        .select(
            'char.hash_id as id',
            'char.system',
            'char.name',
            'char.description',
            'char.portrait',
            'char.thumbnail',
            'char.color',
            'char.campaign',
            'char.details',
            'acc.hash_id as accountID',
            'note.hash_id as noteID'
        )
        .join('note', 'note.note_id', '=', 'char.note_id')
        .join('account as acc', 'acc.account_id', '=', 'char.account_id');

    // Apply any filters
    query = applyFilters(query, filters);

    return Promise.all((await query)
        .map(Character.fromDB)
        .map(async(char) => systemMan.validateCharacterDetails(char)));
} // end list

export async function add(accountID : string, newCharacter : Record<string, unknown>) : Promise<Character>
{
    const notebook = await notebookMan.add();

    const char = Character.fromJSON({ ...newCharacter, id: shortID(), noteID: notebook.id, accountID });

    // FIXME: These hacks should be removed, and `hash_id` should be the foreign_key
    const { account_id } = await accountMan.getRaw(char.accountID);
    const { note_id } = await notebookMan.getRaw(char.noteID);

    await table('character')
        .insert({ ...char.toDB(), account_id, note_id });

    return this.get(char.id);
} // end add

export async function update(charID : string, updateChar : Record<string, unknown>) : Promise<Character>
{
    const char = await this.get(charID);

    // Mix the current character with the allowed updates.
    const allowedUpdate = {
        ...char.toJSON(),
        name: updateChar.name,
        description: updateChar.description,
        portrait: updateChar.portrait,
        thumbnail: updateChar.thumbnail,
        color: updateChar.colot,
        campaign: updateChar.campaign,
        details: updateChar.details
    };

    // Make a new character object
    const newCharacter = Character.fromJSON(allowedUpdate);

    // FIXME: These hacks should be removed, and `hash_id` should be the foreign_key
    const { account_id } = await accountMan.getRaw(char.accountID);
    const { note_id } = await notebookMan.getRaw(char.noteID);

    // Update the database
    await table('character')
        .update({ ...newCharacter.toDB(), account_id, note_id })
        .where({ hash_id: charID });

    const newChar = await get(charID);

    // Broadcast the update
    await broadcast('/characters', {
        type: 'update',
        resource: charID,
        payload: newChar.toJSON()
    });

    // Return the updated record
    return newChar;
} // end update

export async function remove(charID : string) : Promise<{ status : 'ok' }>
{
    await table('character')
        .where({ hash_id: charID })
        .delete();

    // Broadcast the update
    await broadcast('/characters', {
        type: 'remove',
        resource: charID
    });

    return { status: 'ok' };
} // end remove

//----------------------------------------------------------------------------------------------------------------------
