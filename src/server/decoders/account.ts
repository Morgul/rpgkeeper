// ---------------------------------------------------------------------------------------------------------------------
// Account Decoders
// ---------------------------------------------------------------------------------------------------------------------

import { array, email, inexact, string, object } from 'decoders';
import { jsonArrayString, jsonObjectString, stringWithLength, withDefault } from './utils';

// ---------------------------------------------------------------------------------------------------------------------

export const accountRecDecoder = object({
    id: string,
    email,
    name: stringWithLength(3, 255),
    avatar: stringWithLength(3, 255),
    permissions: jsonArrayString(string),
    settings: jsonObjectString(inexact({}))
});

export const accountJsonDecoder = object({
    id: string,
    email,
    name: stringWithLength(3, 255),
    avatar: stringWithLength(3, 255),
    permissions: withDefault(array(string), []),
    settings: withDefault(inexact({}), {})
});

// ---------------------------------------------------------------------------------------------------------------------
