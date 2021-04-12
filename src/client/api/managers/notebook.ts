//----------------------------------------------------------------------------------------------------------------------
// NotesManager
//----------------------------------------------------------------------------------------------------------------------

import { BehaviorSubject, Observable } from 'rxjs';

// Model
import NotebookModel from '../models/notebook';
import NotebookPageModel from '../models/notebookPage';

// Resource Access
import noteRA from '../resource-access/notebook';

//----------------------------------------------------------------------------------------------------------------------

class NotesManager
{
    #selectedSubject : BehaviorSubject<NotebookModel | undefined> = new BehaviorSubject<NotebookModel | undefined>(undefined);

    //------------------------------------------------------------------------------------------------------------------
    // Observables
    //------------------------------------------------------------------------------------------------------------------

    get selected$() : Observable<NotebookModel | undefined> { return this.#selectedSubject.asObservable(); }

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get selected() : NotebookModel | undefined { return this.#selectedSubject.getValue(); }

    //------------------------------------------------------------------------------------------------------------------
    // Public API
    //------------------------------------------------------------------------------------------------------------------

    async select(noteID : string) : Promise<void>
    {
        let note : NotebookModel | undefined = undefined;
        if(noteID)
        {
            note = await noteRA.getNotes(noteID);
        }
        else if(this.selected)
        {
            await noteRA.unloadNote(this.selected.id);
        } // end if

        // Select this note
        this.#selectedSubject.next(note);
    } // end selected

    async addPage(note : NotebookModel, page : NotebookPageModel) : Promise<NotebookPageModel>
    {
        page = await noteRA.addPage(note.id, page);
        note.pages.push(page);

        return page;
    } // end addPage

    async updatePage(note : NotebookModel, page : NotebookPageModel) : Promise<NotebookPageModel>
    {
        return noteRA.updatePage(note.id, page);
    } // end updatePage

    async deletePage(note : NotebookModel, page : NotebookPageModel) : Promise<void>
    {
        await noteRA.deletePage(note.id, page);

        // Remove page from note
        const idx = note.pages.indexOf(page);
        if(idx >= 0)
        {
            note.pages.splice(idx, 1);
        } // end if
    } // end deletePage
} // end NotesManager

//----------------------------------------------------------------------------------------------------------------------

export default new NotesManager();

//----------------------------------------------------------------------------------------------------------------------
