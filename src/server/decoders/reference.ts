// ---------------------------------------------------------------------------------------------------------------------
// Reference Decoders
// ---------------------------------------------------------------------------------------------------------------------

import { object } from 'decoders';
import { stringWithLength } from './utils';

// ---------------------------------------------------------------------------------------------------------------------

export const referenceRecDecoder = object({
    abbr: stringWithLength(2, 255),
    name: stringWithLength(3, 255),
    productCode: stringWithLength(3, 255)
});

export const referenceJsonDecoder = object({
    abbr: stringWithLength(2, 255),
    name: stringWithLength(3, 255),
    productCode: stringWithLength(3, 255)
});

// ---------------------------------------------------------------------------------------------------------------------
