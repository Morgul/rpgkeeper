//----------------------------------------------------------------------------------------------------------------------
// NotesResourceAccess
//----------------------------------------------------------------------------------------------------------------------

import $http from 'axios';

// Interfaces
import { NotePage, Notes } from '../../../common/interfaces/common';

// Models
import NotesModel from '../models/notebook';
import PageModel from '../models/notebookPage';

//----------------------------------------------------------------------------------------------------------------------

class NotesResourceAccess
{
    #notes : Record<string, NotesModel>;
    #pages : Record<string, PageModel>;

    constructor()
    {
        this.#notes = {};
        this.#pages = {};
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------

    _buildPage(def : NotePage) : PageModel
    {
        let page = this.#pages[def.id];
        if(page)
        {
            page.update(def);
        }
        else
        {
            page = new PageModel(def);
            this.#pages[def.id] = page;
        } // end if

        return page;
    } // end _buildPage

    _buildModel(def : Notes) : NotesModel
    {
        // Build pages first
        const pages = (def.pages ?? []).map((page) => this._buildPage(page));

        // Build note second
        let note = this.#notes[def.id];
        if(note)
        {
            note.update({ ...def, pages });
        }
        else
        {
            note = new NotesModel({ ...def, pages });
            this.#notes[def.id] = note;
        } // end if

        return note;
    } // end _buildModel

    //------------------------------------------------------------------------------------------------------------------

    async getNotes(noteID : string) : Promise<NotesModel>
    {
        const { data } = await $http.get(`/notebook/${ noteID }`);
        return this._buildModel(data);
    } // end getNotes

    async addPage(noteID : string, page : PageModel) : Promise<PageModel>
    {
        const { data } = await $http.post(`/notebook/${ noteID }/pages`, page);
        return this._buildPage(data);
    } // end addPage

    async updatePage(noteID : string, page : PageModel) : Promise<PageModel>
    {
        const { data } = await $http.patch(`/notebook/${ noteID }/pages/${ page.id }`, page);
        return this._buildPage(data);
    } // end updatePage

    async deletePage(noteID : string, page : PageModel) : Promise<void>
    {
        await $http.delete(`/notebook/${ noteID }/pages/${ page.id }`);
        if(page.id)
        {
            delete this.#pages[page.id];
        }
    } // end deletePage

    async unloadNote(noteID : string) : Promise<void>
    {
        const note = this.#notes[noteID];

        // Remove the note's pages from our cache
        note.pages.forEach((page) =>
        {
            if(page.id)
            {
                delete this.#pages[page.id];
            }
        });

        // Remove the cache note.
        delete this.#notes[noteID];
    } // end unloadNote
} // end NotesResourceAccess

//----------------------------------------------------------------------------------------------------------------------

export default new NotesResourceAccess();

//----------------------------------------------------------------------------------------------------------------------
