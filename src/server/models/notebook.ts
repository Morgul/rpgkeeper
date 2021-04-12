//----------------------------------------------------------------------------------------------------------------------
// Note
//----------------------------------------------------------------------------------------------------------------------

import * as JsonDecoder from 'decoders';
import { notebookDecoder, notebookPageDecoder } from '../decoders/notebook';

//----------------------------------------------------------------------------------------------------------------------

export interface NotebookPageOptions {
    id : string;
    title : string;
    content : string;
    notebookID : string;
}

export interface NotebookOptions {
    id : string;
    pages ?: NotebookPageOptions[]
}

//----------------------------------------------------------------------------------------------------------------------

export class NotebookPage
{
    public readonly id : string;
    public readonly notebookID : string;

    public title = '';
    public content = '';

    constructor(options : NotebookPageOptions)
    {
        this.id = options.id;
        this.notebookID = options.notebookID;
        this.title = options.title;
        this.content = options.content;
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Serialization
    //------------------------------------------------------------------------------------------------------------------

    public toJSON() : Record<string, unknown>
    {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            notebookID: this.notebookID
        };
    } // end

    public toDB() : Record<string, unknown>
    {
        const { id, notebookID, ...jsonObj } = this.toJSON();
        return {
            ...jsonObj,
            page_id: id,
            note_id: notebookID
        };
    } // end toDB

    //------------------------------------------------------------------------------------------------------------------
    // Deserialization
    //------------------------------------------------------------------------------------------------------------------

    static fromDB(noteRecord : Record<string, unknown>) : NotebookPage
    {
        const decoder = JsonDecoder.guard(notebookPageDecoder);
        return new NotebookPage(decoder(noteRecord) as NotebookPageOptions);
    } // end fromDB

    static fromJSON(jsonObj : Record<string, unknown>) : NotebookPage
    {
        const decoder = JsonDecoder.guard(notebookPageDecoder);
        return new NotebookPage(decoder(jsonObj) as NotebookPageOptions);
    } // end fromJSON
} // end NotebookPage

//----------------------------------------------------------------------------------------------------------------------

export class Notebook
{
    public readonly id : string;
    public pages : NotebookPage[] = [];

    constructor(options : NotebookOptions)
    {
        this.id = options.id;

        if(options.pages)
        {
            this.pages = options.pages.map((page) => new NotebookPage(page));
        } // end if
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Serialization
    //------------------------------------------------------------------------------------------------------------------

    public toJSON() : Record<string, unknown>
    {
        return {
            id: this.id,
            pages: this.pages.map((page) => page.toJSON())
        };
    } // end

    public toDB() : Record<string, unknown>
    {
        return {
            hash_id: this.id
        };
    } // end toDB

    //------------------------------------------------------------------------------------------------------------------
    // Deserialization
    //------------------------------------------------------------------------------------------------------------------

    static fromDB(noteRecord : Record<string, unknown>) : Notebook
    {
        const decoder = JsonDecoder.guard(notebookDecoder);
        return new Notebook(decoder(noteRecord) as NotebookOptions);
    } // end fromDB

    static fromJSON(jsonObj : Record<string, unknown>) : Notebook
    {
        const decoder = JsonDecoder.guard(notebookDecoder);
        return new Notebook(decoder(jsonObj) as NotebookOptions);
    } // end fromJSON
} // end Notebook

//----------------------------------------------------------------------------------------------------------------------

