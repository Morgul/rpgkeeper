//----------------------------------------------------------------------------------------------------------------------
// BaseSystem
//----------------------------------------------------------------------------------------------------------------------

import { Character } from '../models/character';

//----------------------------------------------------------------------------------------------------------------------

export const enum SupportStatus
{
    InDevelopment = 'dev',
    PublicBeta = 'beta',
    Disabled = 'disabled'
}

//----------------------------------------------------------------------------------------------------------------------

export class BaseSystem
{
    public readonly id : string;
    public readonly name : string;
    public readonly description : string;
    public readonly defaults : Record<string, unknown>;
    public readonly status ?: SupportStatus;

    constructor(
        id : string,
        name : string,
        description : string,
        defaults : Record<string, unknown> = {},
        status ?: SupportStatus
    )
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.defaults = defaults;
        this.status = status;
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // API
    //------------------------------------------------------------------------------------------------------------------

    async init() : Promise<void>
    {
        /* No work to do here! */
    } // end init

    async validateCharacterDetails(character : Character) : Promise<Character>
    {
        // By default, there's no work to do.
        return character;
    } // end validateCharacterDetails

    toJSON() : Record<string, unknown>
    {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            defaults: this.defaults,
            status: this.status
        };
    } // end toJSON
} // end BaseSystem

//----------------------------------------------------------------------------------------------------------------------
