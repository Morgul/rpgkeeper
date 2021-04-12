// ---------------------------------------------------------------------------------------------------------------------
// Common Interfaces
// ---------------------------------------------------------------------------------------------------------------------

import { AccountOptions, AccountSettings as Settings } from '../../server/models/account';
import { SupportStatus } from '../../server/systems/base';
import { SupplementOptions } from '../../server/models/supplement';
import { NotebookOptions, NotebookPageOptions } from '../../server/models/notebook';
import { CharacterOptions } from '../../server/models/character';

// ---------------------------------------------------------------------------------------------------------------------

export type Account = AccountOptions;
export type AccountSettings = Settings;

export interface System<Defaults extends Record<string, unknown>> {
    id : string;
    name : string;
    description : string;
    defaults : Defaults;
    status : SupportStatus;
}

export type Character<SystemDetails extends Record<string, unknown> = Record<string, unknown>> = CharacterOptions<SystemDetails>

export type Supplement = SupplementOptions;

export type Notes = NotebookOptions;
export type NotePage = NotebookPageOptions;

// ---------------------------------------------------------------------------------------------------------------------
