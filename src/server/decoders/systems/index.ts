// ---------------------------------------------------------------------------------------------------------------------
// System Specific Decoders
// ---------------------------------------------------------------------------------------------------------------------

import { Decoder, fail } from 'decoders';

// System Decoders
import { wfrpSysDetailsDecoder } from './wfrp';
import { risusSysDetailsDecoder } from './risus';
import { fateSysDetailsDecoder } from './fate';
import { eoteSysDetailsDecoder, genesysSysDetailsDecoder } from './eote';

// ---------------------------------------------------------------------------------------------------------------------

export function sysDetailsDecoder<T extends Record<string, unknown>>(system : string) : Decoder<T>
{
    // Add an entry for every possible system type, and return the decoder for those system details.
    switch (system)
    {
        case 'genesys':
            return genesysSysDetailsDecoder as Decoder<T>;
        case 'eote':
            return eoteSysDetailsDecoder as Decoder<T>;
        case 'fate':
            return fateSysDetailsDecoder as Decoder<T>;
        case 'risus':
            return risusSysDetailsDecoder as Decoder<T>;
        case 'wfrp':
            return wfrpSysDetailsDecoder as Decoder<T>;
        default:
            return fail(`Unknown system '${ system }'.`);
    } // end switch
} // end sysDetailsDecoder

// ---------------------------------------------------------------------------------------------------------------------
