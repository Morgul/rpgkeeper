// ---------------------------------------------------------------------------------------------------------------------
// Notebook Decoders
// ---------------------------------------------------------------------------------------------------------------------

import { array, either, number, string, object, optional } from 'decoders';
import { withDefault } from './utils';

// ---------------------------------------------------------------------------------------------------------------------

export const notebookPageDecoder = object({
    id: optional(either(string, number)),
    title: string,
    content: optional(string),
    notebookID: string
});

// ---------------------------------------------------------------------------------------------------------------------

export const notebookDecoder = object({
    id: string,
    pages: withDefault(array(notebookPageDecoder), [])
});

// ---------------------------------------------------------------------------------------------------------------------
