// ---------------------------------------------------------------------------------------------------------------------
// Character Decoders
// ---------------------------------------------------------------------------------------------------------------------

import { inexact, object, optional, string } from 'decoders';
import { hexColor, jsonObjectString, nullToUndefined, stringWithLength, withDefault } from './utils';

// ---------------------------------------------------------------------------------------------------------------------

export const characterRecDecoder = object({
    id: string,
    system: stringWithLength(3, 255),
    accountID: stringWithLength(3, 255),
    noteID: stringWithLength(3, 255),
    name: stringWithLength(1, 255),
    description: optional(string),
    portrait: optional(nullToUndefined(string)),
    thumbnail: optional(string),
    color: optional(hexColor),
    campaign: optional(stringWithLength(0, 255)),
    details: jsonObjectString(inexact({}))
});

export const characterJsonDecoder = object({
    id: string,
    system: stringWithLength(3, 255),
    accountID: stringWithLength(3, 255),
    noteID: stringWithLength(3, 255),
    name: stringWithLength(1, 255),
    description: optional(string),
    portrait: optional(string),
    thumbnail: optional(string),
    color: optional(hexColor),
    campaign: optional(stringWithLength(0, 255)),
    details: withDefault(inexact({}), {})
});

// ---------------------------------------------------------------------------------------------------------------------
