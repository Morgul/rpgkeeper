//----------------------------------------------------------------------------------------------------------------------
// CharacterManager
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

// Interfaces
import { Character } from '../../../common/interfaces/common';

// Models
import AccountModel from '../models/account';
import CharacterModel from '../models/character';

// Managers
import authMan from './auth';
import notesMan from './notebook';

// Resource Access
import characterRA from '../resource-access/character';

//----------------------------------------------------------------------------------------------------------------------

class CharacterManager
{
    #charactersSubject : BehaviorSubject<CharacterModel[]>;
    #selectedSubject : BehaviorSubject<CharacterModel | undefined>;
    #savingSubject : BehaviorSubject<boolean>;
    #statusSubject : BehaviorSubject<string>;
    #socket : Socket;

    constructor()
    {
        // Subjects
        this.#charactersSubject = new BehaviorSubject([] as CharacterModel[]);
        this.#selectedSubject = new BehaviorSubject<CharacterModel | undefined>(undefined);
        this.#savingSubject = new BehaviorSubject<boolean>(false);
        this.#statusSubject = new BehaviorSubject('loading');

        // Listen for messages on the socket.
        this.#socket = io('/characters');
        this.#socket.on('message', this._onMessage.bind(this));

        // Subscriptions
        authMan.account$.subscribe(this._onAccountChanged.bind(this));
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Observables
    //------------------------------------------------------------------------------------------------------------------

    get characters$() : Observable<CharacterModel[]> { return this.#charactersSubject.asObservable(); }
    get selected$() : Observable<CharacterModel | undefined> { return this.#selectedSubject.asObservable(); }
    get saving$() : Observable<boolean> { return this.#savingSubject.asObservable(); }
    get status$() : Observable<string> { return this.#statusSubject.asObservable(); }

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get characters() : CharacterModel[] { return this.#charactersSubject.getValue(); }
    get selected() : CharacterModel | undefined { return this.#selectedSubject.getValue(); }
    get saving() : boolean { return this.#savingSubject.getValue(); }
    set saving(val : boolean) { this.#savingSubject.next(!!val); }
    get status() : string { return this.#statusSubject.getValue(); }

    //------------------------------------------------------------------------------------------------------------------
    // Subscriptions
    //------------------------------------------------------------------------------------------------------------------

    async _onAccountChanged(account : AccountModel | undefined) : Promise<void>
    {
        if(account && account.email)
        {
            const characters = await characterRA.getAllCharacters(account.email);
            this.#charactersSubject.next(characters);
            this.#statusSubject.next('loaded');
        }
        else
        {
            this.#charactersSubject.next([]);
        } // end if
    } // end _onAccountChanged

    _onMessage(envelope) : void
    {
        if(envelope.type === 'update')
        {
            characterRA.$update(envelope.payload);
        }
        else if(envelope.type === 'remove')
        {
            characterRA.$remove(envelope.resource);
            const characters = this.characters.filter((char) => char.id !== envelope.resource);
            this.#charactersSubject.next(characters);

            // TODO: We need to pop some kind of warning that the character was deleted.
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Public API
    //------------------------------------------------------------------------------------------------------------------

    async create(charDef : Character) : Promise<CharacterModel>
    {
        return characterRA.newCharacter(charDef);
    } // end create

    async updateSysDefaults(char) : Promise<CharacterModel>
    {
        return characterRA.updateSysDefaults(char);
    } // end updateSysDefaults

    async select(charID) : Promise<CharacterModel>
    {
        let char = _.find(this.characters, { id: charID });
        if(!char)
        {
            char = await characterRA.getCharacter(charID);

            // Add to our internal cache of characters
            this.characters.push(char);
            this.#charactersSubject.next(this.characters);
        } // end if

        // Select this character
        this.#selectedSubject.next(char);

        // Select the notes in the notes manager
        notesMan.select(char.noteID);

        return char;
    } // end selected

    /**
     * Save the character. Attempts to debounce this; we will only have one active save at a time, and if the character
     * is still dirty once we're done, we save again. (Because this is promised based, this shouldn't be able to
     * overflow the stack.)
     *
     * @param character - The character model instance
     *
     * @returns Returns the updated character model instance. This is the same object that was passed in, with internal
     * changes only.
     */
    async save(character : CharacterModel) : Promise<CharacterModel>
    {
        // Default to the selected character, if none is passed in.
        character = character || this.selected;

        // If we're already saving, we just return.
        if(this.saving || !character.dirty)
        {
            return character;
        } // end if

        // Otherwise, we set ourselves to saving
        this.saving = true;

        // Save Character
        await characterRA.saveCharacter(character);

        // We're done saving
        this.saving = false;

        // Check to see if we need to save again, in case other changes have come in while saving.
        if(character.dirty)
        {
            await this.save(character);
        } // end if

        // If we're saving someone new, let's add it to our list of characters.
        if(!this.characters.includes(character))
        {
            this.characters.push(character);
            this.#charactersSubject.next(this.characters);
        } // end if

        return character;
    } // end save

    async delete(character : CharacterModel) : Promise<void>
    {
        if(character.id)
        {
            await characterRA.deleteCharacter({ id: character.id });
            const characters = _.without(this.characters, character);
            this.#charactersSubject.next(characters);
        }
    } // end delete
} // end CharacterManager

//----------------------------------------------------------------------------------------------------------------------

export default new CharacterManager();

//----------------------------------------------------------------------------------------------------------------------
