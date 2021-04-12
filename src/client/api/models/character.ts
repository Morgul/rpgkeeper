//----------------------------------------------------------------------------------------------------------------------
// CharacterModel
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';

// Interfaces
import { Character } from '../../../common/interfaces/common';

// Utils
import { shortID, colorize } from '../../../server/utils/misc';
import { markNonConfigurable } from '../utils/nonreactive';

//----------------------------------------------------------------------------------------------------------------------

class CharacterModel<SystemDetails extends Record<string, unknown> = Record<string, unknown>>
{
    #state : Partial<Character<SystemDetails>>;
    #refState : Partial<Character<SystemDetails>>;
    #sysDefaults : Record<string, unknown>;

    constructor(def : Character<SystemDetails>, sysDefaults : Record<string, unknown> = {})
    {
        // Save off the defaults for the system specific portion.
        this.#sysDefaults = _.cloneDeep(sysDefaults);

        // Set some defaults
        this.#state = { ...this.$defaults };
        this.#refState = { ...this.$defaults };

        // Set our properties
        this.update(def);

        // Mark the ref state as non-configurable, so vue ignores it.
        markNonConfigurable(this, '#refState');
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get $defaults() : Partial<Character<SystemDetails>>
    {
        return {
            id: undefined,
            system: undefined,
            name: '',
            description: '',
            portrait: '',
            thumbnail: '',
            color: colorize(shortID()),
            campaign: '',
            details: this.#sysDefaults as SystemDetails,
            accountID: undefined,
            noteID: undefined
        };
    }

    get dirty() : boolean { return !_.isEqual(this.#state, this.#refState); }
    get original() : Partial<Character<SystemDetails>> { return { ...this.#refState }; }

    get id() : string | undefined { return this.#state.id; }
    get details() : SystemDetails { return this.#state.details ?? {} as SystemDetails; }
    get accountID() : string | undefined { return this.#state.accountID; }
    get noteID() : string | undefined { return this.#state.noteID; }
    get initial() : string { return (this.name?.[0] ?? '?').toUpperCase(); }

    get system() : string | undefined { return this.#state.system; }
    set system(val : string | undefined) { this.#state.system = val; }
    get name() : string | undefined { return this.#state.name; }
    set name(val : string | undefined) { this.#state.name = val; }
    get description() : string | undefined { return this.#state.description; }
    set description(val : string | undefined) { this.#state.description = val; }
    get portrait() : string | undefined { return this.#state.portrait; }
    set portrait(val : string | undefined) { this.#state.portrait = val; }
    get thumbnail() : string | undefined { return this.#state.thumbnail; }
    set thumbnail(val : string | undefined) { this.#state.thumbnail = val; }
    get color() : string | undefined { return this.#state.color; }
    set color(val : string | undefined) { this.#state.color = val; }
    get campaign() : string | undefined { return this.#state.campaign; }
    set campaign(val : string | undefined) { this.#state.campaign = val; }

    //------------------------------------------------------------------------------------------------------------------
    // Model API
    //------------------------------------------------------------------------------------------------------------------

    revert() : void
    {
        this.#state = _.cloneDeep(this.#refState);
    } // end revert

    update(def : Character<SystemDetails>) : void
    {
        // TODO: Decide if this is even worth it, as it's caused bugs in the past. It basically means that if a user
        // deletes something, it reverts back to the default, instead of staying removed. I don't think that's right.
        const defaults = _.cloneDeep(this.$defaults);
        this.#state = _.assign({}, defaults, _.cloneDeep(def));
        this.#refState = _.assign({}, defaults, _.cloneDeep(def));
    } // end update

    updateSysDefaults(sysDef : SystemDetails) : void
    {
        this.#sysDefaults = sysDef;

        // We only update the details if this is a 'new' instance of a character, otherwise we would be overwriting
        // user data, a bug that lead directly to this code.
        if(!this.id)
        {
            this.#refState.details = _.cloneDeep(sysDef);
            this.#state.details = _.cloneDeep(sysDef);
        } // end if
    } // end updateSysDefaults

    toJSON() : Partial<Character<SystemDetails>>
    {
        return _.cloneDeep(this.#state);
    } // end toJSON
} // end CharacterModel

//----------------------------------------------------------------------------------------------------------------------

export default CharacterModel;

//----------------------------------------------------------------------------------------------------------------------
