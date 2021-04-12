// ---------------------------------------------------------------------------------------------------------------------
// Supplements
// ---------------------------------------------------------------------------------------------------------------------

import { string, truthy, Decoder, optional } from 'decoders';

// System Decoders
import { getEotESupplementDecoder, getGenesysSupplementDecoder } from './systems/eote';

// Utils
import { enumStr, nullToUndefined, stringWithLength, withDefault } from './utils';
import { MissingDecoderError } from '../errors';

// ---------------------------------------------------------------------------------------------------------------------

export const supplementalDecoderPartial = {
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
};

// ---------------------------------------------------------------------------------------------------------------------

export function getSupplementDecoder(system : string, type : string) : Decoder<unknown>
{
    switch (system)
    {
        case 'eote':
            return getEotESupplementDecoder(type);

        case 'genesys':
            return getGenesysSupplementDecoder(type);

        default:
            throw new MissingDecoderError(`${ system }/${ type }`);
    } // end switch
} // end getSupplementDecoder

// ---------------------------------------------------------------------------------------------------------------------
