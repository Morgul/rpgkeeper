//----------------------------------------------------------------------------------------------------------------------
// AccountModel
//----------------------------------------------------------------------------------------------------------------------

import { Account, AccountSettings } from '../../../common/interfaces/common';

//----------------------------------------------------------------------------------------------------------------------

type AccountState = Account & { created : number };

//----------------------------------------------------------------------------------------------------------------------

class AccountModel
{
    #state : Partial<AccountState>;

    constructor(def : Partial<Account>)
    {
        // Set our properties
        this.#state = {
            id: undefined,
            email: undefined,
            name: undefined,
            avatar: undefined,
            permissions: [],
            groups: [],
            settings: {},
            created: Date.now(),
            ...def
        };
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get id() : string | undefined { return this.#state.id; }
    get email() : string | undefined { return this.#state.email; }
    get displayName() : string | undefined { return this.#state.name || this.#state.email; }
    get avatar() : string | undefined { return this.#state.avatar; }
    get avatarUrl() : string
    {
        const id = (this.id ?? '').replace(/-/g, '');
        return this.#state.avatar || `https://identicons.github.com/${ id }.png`;
    }

    get groups() : string[] { return this.#state.groups ?? []; }

    get name() : string | undefined { return this.#state.name; }
    set name(val : string | undefined) { this.#state.name = val; }
    get permissions() : string[] { return this.#state.permissions ?? []; }
    set permissions(val : string[]) { this.#state.permissions = val; }
    get settings() : AccountSettings { return this.#state.settings ?? {}; }
    set settings(val : AccountSettings) { this.#state.settings = val; }

    //------------------------------------------------------------------------------------------------------------------
    // Model API
    //------------------------------------------------------------------------------------------------------------------

    update(def : AccountState) : void
    {
        this.#state = Object.assign(this.#state, def);
    } // end update

    toJSON() : Partial<AccountState>
    {
        return { ...this.#state };
    } // end toJSON
} // end AccountModel

//----------------------------------------------------------------------------------------------------------------------

export default AccountModel;

//----------------------------------------------------------------------------------------------------------------------
