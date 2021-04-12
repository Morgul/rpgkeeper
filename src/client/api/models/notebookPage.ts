//----------------------------------------------------------------------------------------------------------------------
// NotebookPageModel
//----------------------------------------------------------------------------------------------------------------------

// Interfaces
import { NotePage } from '../../../common/interfaces/common';

// Utils
import { markNonConfigurable } from '../utils/nonreactive';

//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------

class NotebookPageModel
{
    #state : Partial<NotePage>;
    #refState : Partial<NotePage>;

    constructor(def : Partial<NotePage>)
    {
        // Set our properties
        this.#state = { id: undefined, title: undefined, content: undefined, ...def };

        // Store our reference model to revert back to
        this.#refState = { id: undefined, title: undefined, content: undefined, ...def };

        // Mark the ref state as non-configurable, so vue ignores it.
        markNonConfigurable(this, '#refState');
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get id() : string | undefined { return this.#state.id; }

    get title() : string | undefined { return this.#state.title; }
    set title(title : string | undefined) { this.#state.title = title; }

    get content() : string | undefined { return this.#state.content; }
    set content(content : string | undefined) { this.#state.content = content; }

    //------------------------------------------------------------------------------------------------------------------
    // Model API
    //------------------------------------------------------------------------------------------------------------------

    revert() : void
    {
        this.#state = Object.assign(this.#state, this.#refState);
    } // end revert

    update(def : Partial<NotePage>) : void
    {
        this.#state = Object.assign(this.#state, def);
        this.#refState = { id: undefined, title: undefined, content: undefined, ...def };
    } // end update

    toJSON() : { id ?: string, title ?: string, content ?: string }
    {
        return {
            id: this.#state.id,
            title: this.#state.title,
            content: this.#state.content
        };
    } // end toJSON
} // end NotebookPageModel

//----------------------------------------------------------------------------------------------------------------------

export default NotebookPageModel;

//----------------------------------------------------------------------------------------------------------------------
