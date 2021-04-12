// ---------------------------------------------------------------------------------------------------------------------
// Notes Manager
// ---------------------------------------------------------------------------------------------------------------------

// Managers
import { table } from './database';

// Models
import { Notebook, NotebookPage } from '../models/notebook';

// Utils
import { shortID } from '../utils/misc';
import { MultipleResultsError, NotFoundError } from '../errors';

// ---------------------------------------------------------------------------------------------------------------------

export interface NoteFilters {
    id : unknown,
    email : unknown,
    title : unknown
}

// ---------------------------------------------------------------------------------------------------------------------

export async function get(notebookID : string) : Promise<Notebook>
{
    const pages = (await table('note_page as np')
        .select(
            'page_id as id',
            'n.hash_id as notebookID',
            'content',
            'title'
        )
        .join('note as n', 'n.note_id', '=', 'np.note_id')
        .where({ 'n.hash_id': notebookID }))
        .map(NotebookPage.fromDB);

    return Notebook.fromDB({ id: notebookID, pages });
} // end get

export async function list(filters : NoteFilters) : Promise<Notebook[]>
{
    const query = table('note as n')
        .select('n.hash_id as notebookID')
        .distinct('n.hash_id')
        .leftJoin('note_page as np', 'np.note_id', '=', 'n.note_id')
        .join('character as c', 'c.note_id', '=', 'n.note_id')
        .join('account as a', 'a.account_id', '=', 'c.account_id');

    if(filters.id)
    {
        query.where({ 'n.hash_id': filters.id });
    } // end if

    if(filters.email)
    {
        query.where({ 'a.email': filters.email });
    } // end if

    if(filters.title)
    {
        query.where({ 'np.title': filters.title });
    } // end if

    return Promise.all((await query)
        .map(({ notebookID }) =>
        {
            return get(notebookID);
        }));
} // end list

export async function getRaw(notebookID : string) : Promise<Record<string, unknown>>
{
    const notebooks = await table('note')
        .select()
        .where({ hash_id: notebookID });

    if(notebooks.length > 1)
    {
        throw new MultipleResultsError('notebook');
    }
    else if(notebooks.length === 0)
    {
        throw new NotFoundError(`No notebook record found for notebook '${ notebookID }'.`);
    }
    else
    {
        return notebooks[0];
    } // end if
} // end getRaw

export async function getPage(pageID : string | number) : Promise<NotebookPage>
{
    const pages = await table('note_page as np')
        .select(
            'page_id as id',
            'n.hash_id as notebookID',
            'content',
            'title'
        )
        .join('note as n', 'n.note_id', '=', 'np.note_id')
        .where({ id: pageID });

    if(pages.length > 1)
    {
        throw new MultipleResultsError('page');
    }
    else if(pages.length === 0)
    {
        throw new NotFoundError(`No page record found for id '${ pageID }'.`);
    }
    else
    {
        return NotebookPage.fromDB(pages[0]);
    } // end if
} // end addPage

export async function addPage(notebookID : string, page : Record<string, unknown>) : Promise<NotebookPage>
{
    const notePage = NotebookPage.fromJSON({ ...page, notebookID });

    const [ notebook ] = await table('note')
        .select('note_id as id')
        .where({ hash_id: notebookID })
        .catch(() =>
        {
            throw new NotFoundError(`No notebook record found for id '${ notebookID }'`);
        });

    const [ pageID ] = await table('note_page')
        .insert({ ...notePage.toDB(), note_id: notebook.id });

    // Return the notebook page
    return getPage(pageID);
} // end addPage

export async function add(pages : Record<string, unknown>[] = []) : Promise<Notebook>
{
    const newNoteID = shortID();

    await table('note')
        .insert({ hash_id: newNoteID });

    // Add any pages that were specified
    await Promise.all(pages.map(async(page) =>
    {
        await addPage(newNoteID, page);
    }));

    // Return the note
    return get(newNoteID);
} // end add

export async function updatePage(pageID : string | number, pageUpdate : Record<string, unknown>) : Promise<NotebookPage>
{
    // Get the current page
    const page = await getPage(pageID);

    // Mix the current page with the allowed updates.
    const allowedUpdate = {
        ...page.toJSON(),
        title: pageUpdate.title ?? page.title,
        content: pageUpdate.content ?? page.content
    };

    // Make a new page object
    const newPage = NotebookPage.fromJSON(allowedUpdate);

    // FIXME: We have to drop this, since we don't want to update it. This will be fixed if we switch to having a
    //  foreign key on the hash_id.
    const { note_id, ...dbRest } = newPage.toDB();

    // Update the database
    await table('note_page')
        .update(dbRest)
        .where({ page_id: pageID });

    // Return the updated record
    return getPage(pageID);
} // end updatePage

export async function removePage(pageID : string) : Promise<{ status : 'ok' }>
{
    await table('note_page')
        .where({ page_id: pageID })
        .delete();

    return { status: 'ok' };
} // end removePage

export async function remove(notebookID : string) : Promise<{ status : 'ok' }>
{
    await table('note')
        .where({ hash_id: notebookID })
        .delete();

    return { status: 'ok' };
} // end remove

// ---------------------------------------------------------------------------------------------------------------------
