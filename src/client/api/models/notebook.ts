//----------------------------------------------------------------------------------------------------------------------
// NotebookModel
//----------------------------------------------------------------------------------------------------------------------

import NotebookPageModel from './notebookPage';

//----------------------------------------------------------------------------------------------------------------------

class NotebookModel
{
    #id : string;
    #pages : NotebookPageModel[];

    constructor(def : { id : string, pages : NotebookPageModel[] })
    {
        this.#id = def.id;
        this.#pages = def.pages || [];
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get id() : string { return this.#id; }
    get pages() : NotebookPageModel[] { return this.#pages; }

    //------------------------------------------------------------------------------------------------------------------
    // Model API
    //------------------------------------------------------------------------------------------------------------------

    revert() : void
    {
        this.pages.forEach((page) => page.revert());
    } // end revert

    update(def : { id : string, pages : NotebookPageModel[] }) : void
    {
        this.#id = def.id;
        this.#pages = def.pages || [];
    } // end update

    toJSON() : { id : string, pages : { id ?: string, title ?: string, content ?: string }[] }
    {
        return {
            id: this.#id,
            pages: this.pages.map((page) => page.toJSON())
        };
    } // end toJSON
} // end NotebookModel

//----------------------------------------------------------------------------------------------------------------------

export default NotebookModel;

//----------------------------------------------------------------------------------------------------------------------
