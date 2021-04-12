// ---------------------------------------------------------------------------------------------------------------------
// Utility Decoders
// ---------------------------------------------------------------------------------------------------------------------

import {
    Decoder,
    array,
    compose,
    integer,
    predicate,
    map,
    nullable,
    optional,
    regex,
    string,
    either, inexact
} from 'decoders';

// ---------------------------------------------------------------------------------------------------------------------

export const hexColor = regex(/^#(?:[0-9a-f]{3}){1,2}$/i, 'Must be a valid hex color code.');

export function nullToUndefined<T>(itemDecoder : Decoder<T>) : Decoder<T | undefined>
{
    return map(
        nullable(itemDecoder),
        (val) => val ?? undefined
    );
} // end nullToUndefined

export function withDefault<T>(itemDecoder : Decoder<T>, defaultVal : T) : Decoder<T>
{
    return map(
        optional(itemDecoder),
        (val) => val ?? defaultVal
    );
} // withDefault

export function jsonArrayString<T>(itemDecoder : Decoder<T>) : Decoder<Array<T>>
{
    const decodeJsonStr = map(
        either(string, array(itemDecoder)),
        (item) =>
        {
            return typeof item === 'string' ? JSON.parse(item) : item;
        }
    );

    return compose(
        decodeJsonStr,
        array(itemDecoder)
    );
} // end jsonArrayString

export function jsonObjectString<T>(objectDecoder : Decoder<T>) : Decoder<T>
{
    const decodeJsonStr = map(
        either(string, inexact({})),
        (item) =>
        {
            return typeof item === 'string' ? JSON.parse(item) : item;
        }
    );

    return compose(
        decodeJsonStr,
        objectDecoder
    );
} // end jsonObjectString

export function arrayWithLength<T>(itemDecoder : Decoder<T>, min : number, max = Infinity) : Decoder<Array<T>>
{
    let decoder = compose(
        array(itemDecoder),
        predicate((arr) => arr.length >= min, `Must have length greater than or equal to ${ min }.`)
    );

    if(max && max >= min)
    {
        decoder = compose(
            decoder,
            predicate((arr) => arr.length < max, `Must have length less than ${ max }.`)
        );
    } // end if

    return decoder;
} // end arrayWithLength

export function stringWithLength(min : number, max = Infinity) : Decoder<string>
{
    let decoder = compose(
        string,
        predicate((str) => str.length >= min, `Must be greater than or equal to ${ min } characters.`)
    );

    if(max && max >= min)
    {
        decoder = compose(
            decoder,
            predicate((str) => str.length <= max, `Must be less than ${ max } characters.`)
        );
    } // end if

    return decoder;
} // end stringWithLength

export function boundedInteger(min : number, max = Infinity) : Decoder<number>
{
    let decoder = compose(
        integer,
        predicate((int) => int >= min, `Must be greater than or equal to ${ min }.`)
    );

    if(max && max >= min)
    {
        decoder = compose(
            decoder,
            predicate((int) => int <= max, `Must be less than ${ max }.`)
        );
    } // end if

    return decoder;
} // end boundedInteger

export function enumStr<T extends string>(options : string[]) : Decoder<T>
{
    return compose(
        string,
        predicate((str) => options.includes(str), `Must be a one of: ${ options.join(', ') }.`)
    ) as Decoder<T>;
} // end enumStr

// ---------------------------------------------------------------------------------------------------------------------
