//----------------------------------------------------------------------------------------------------------------------
// Role
//----------------------------------------------------------------------------------------------------------------------

import * as JsonDecoder from 'decoders';

// Decoders
import { roleJsonDecoder, roleRecDecoder } from '../decoders/role';

//----------------------------------------------------------------------------------------------------------------------

export interface RoleOptions {
    id : number;
    name : string;
    permissions ?: string[];
}

//----------------------------------------------------------------------------------------------------------------------

export class Role
{
    public readonly id : number;
    public readonly name : string;
    public permissions : string[] = [];

    constructor(options : RoleOptions)
    {
        this.id = options.id;
        this.name = options.name;
        this.permissions = options.permissions ?? [];
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Serialization
    //------------------------------------------------------------------------------------------------------------------

    public toJSON() : Record<string, unknown>
    {
        return {
            id: this.id,
            name: this.name,
            permissions: this.permissions
        };
    } // end

    public toDB() : Record<string, unknown>
    {
        const { id, ...jsonObj } = this.toJSON();
        return {
            ...jsonObj,
            role_id: id,
            permissions: JSON.stringify(this.permissions)
        };
    } // end toDB

    //------------------------------------------------------------------------------------------------------------------
    // Deserialization
    //------------------------------------------------------------------------------------------------------------------

    static fromDB(roleRecord : Record<string, unknown>) : Role
    {
        const decoder = JsonDecoder.guard(roleRecDecoder);
        return new Role(decoder(roleRecord));
    } // end fromDB

    static fromJSON(jsonObj : Record<string, unknown>) : Role
    {
        const decoder = JsonDecoder.guard(roleJsonDecoder);
        return new Role(decoder(jsonObj));
    } // end fromJSON
} // end Role

//----------------------------------------------------------------------------------------------------------------------
