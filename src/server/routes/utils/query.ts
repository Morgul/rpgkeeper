//----------------------------------------------------------------------------------------------------------------------
// A module for casting query parameters to something useful, and generating a filter out of them.
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import logging from 'trivial-logging';
const logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------
// Types/Interfaces
//----------------------------------------------------------------------------------------------------------------------

export type JSONPrimitive = string | number | boolean;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member : string] : JSONValue };
export type JSONArray = JSONValue[];

/**
 * Represents the parsable types for the filter
 */
export type QueryFilterVal = JSONValue | JSONArray | JSONObject;

/**
 * Supported Filter operations.
 */
export type FilterOperation = '>=' | '@>' | '>' | '<=' | '<' | '=';

/**
 * Represents a parsed filter operation and it's value.
 */
export interface FilterToken
{
    operation : FilterOperation,
    value : QueryFilterVal
}

//----------------------------------------------------------------------------------------------------------------------
// Helpers
//----------------------------------------------------------------------------------------------------------------------

/**
 * Casts the parameter to the specified type.
 *
 * @param type - The type to cast the value as.
 * @param value - A string representing the value
 */
function castParam(type : any, value : string) : QueryFilterVal
{
    switch (type)
    {
        case Array:
            if(typeof value === 'string')
            {
                // eslint-disable-next-line no-use-before-define
                return value.split(',').map((val) => detectParam(val)) as QueryFilterVal;
            }
            else
            {
                throw new TypeError('Only strings can be cast to arrays!');
            } // end if

        case Boolean:
            return value === 'true';

        case Number:
            return Number(value);

        default:
            return value;
    } // end switch
} // end castParam

/**
 * Detect the type and attempt to cast it.
 *
 * @param value
 */
function detectParam(value : string) : QueryFilterVal
{
    if(value === 'true' || value === 'false')
    {
        return castParam(Boolean, value);
    }
    else if(_.includes(value, ','))
    {
        return castParam(Array, value);
    }
    else
    {
        // Attempt converting to a number
        const tmp = castParam(Number, value);

        if(!_.isNaN(tmp))
        {
            return tmp;
        } // end if

        // Otherwise, we give up
        return value;
    } // end if
} // end detectParam

//----------------------------------------------------------------------------------------------------------------------
// Filters
//----------------------------------------------------------------------------------------------------------------------

/**
 * Return a function that returns true if the model value and query value are equal.
 *
 * @param queryVal - The value from the query string to test against.
 */
function eqFilter(queryVal : QueryFilterVal) : (modelVal : QueryFilterVal) => boolean
{
    return (modelVal) => modelVal === queryVal;
} // end eqFilter

/**
 * Return a function that returns true if the model value is greater than the query value.
 *
 * @param queryVal - The value from the query string to test against.
 */
function gtFilter(queryVal : QueryFilterVal) : (modelVal : QueryFilterVal) => boolean
{
    return (modelVal) => modelVal > queryVal;
} // end gtFilter

/**
 * Return a function that returns true if the model value is greater than or equal to the query value.
 *
 * @param queryVal - The value from the query string to test against.
 */
function gteFilter(queryVal : QueryFilterVal) : (modelVal : QueryFilterVal) => boolean
{
    return (modelVal) => modelVal >= queryVal;
} // end gteFilter

/**
 * Return a function that returns true if the model value is less than the query value.
 *
 * @param queryVal - The value from the query string to test against.
 */
function ltFilter(queryVal : QueryFilterVal) : (modelVal : QueryFilterVal) => boolean
{
    return (modelVal) => modelVal < queryVal;
} // end ltFilter

/**
 * Return a function that returns true if the model value is less than or equal to the query value.
 *
 * @param queryVal - The value from the query string to test against.
 */
function lteFilter(queryVal : QueryFilterVal) : (modelVal : QueryFilterVal) => boolean
{
    return (modelVal) => modelVal <= queryVal;
} // end lteFilter

/**
 * Return a function that returns true if the model value is not equal to the difference of the model and query values.
 *
 * @param queryVal - The value from the query string to test against.
 */
function arrayFilter(queryVal : QueryFilterVal) : (modelVal : QueryFilterVal) => boolean
{
    return (modelVal) =>
    {
        if(Array.isArray(modelVal) && Array.isArray(queryVal))
        {
            return !_.isEqual(modelVal, _.difference(modelVal, queryVal));
        }
        else
        {
            throw new TypeError('Both the model value and the query value must be arrays');
        } // end if
    };
} // end arrayFilter

/**
 * Return a function that returns true if the model value contains the query value.
 *
 * @param queryVal - The value from the query string to test against.
 */
function containsFilter(queryVal : QueryFilterVal) : (modelVal : QueryFilterVal) => boolean
{
    return (modelVal) =>
    {
        if((typeof modelVal === 'string') && (typeof queryVal === 'string'))
        {
            modelVal = modelVal.toLowerCase();
            queryVal = queryVal.toLowerCase();
        } // end if

        if(Array.isArray(modelVal))
        {
            return modelVal.includes(queryVal);
        } // end if

        // Only Strings and Arrays are supported
        return false;
    };
} // end containsFilter

//----------------------------------------------------------------------------------------------------------------------
// Public API
//----------------------------------------------------------------------------------------------------------------------

/**
 * Parse the query object for filters, and build a parse tree of those filters.
 *
 * @param queryObj - The parsed query parameters, i.e. `{ foo: 'bar', bar: '>3' }`
 *
 * @returns a parse tree of the query parameters.
 */
export function parseQuery(queryObj : Record<string, string>) : Record<string, FilterToken>
{
    const parseTree = {};
    _.forIn(queryObj, (value : string, key : string) =>
    {
        // Check for greater than or less than
        if(value.substr(0, 2) === '>=')
        {
            value = value.substr(2);
            parseTree[key] = { value: detectParam(value), operation: '>=' };
        }
        else if(value.substr(0, 2) === '@>')
        {
            value = value.substr(2);
            parseTree[key] = { value: detectParam(value), operation: '@>' };
        }
        else if(value.substr(0, 1) === '>')
        {
            value = value.substr(1);
            parseTree[key] = { value: detectParam(value), operation: '>' };
        }
        else if(value.substr(0, 2) === '<=')
        {
            value = value.substr(2);
            parseTree[key] = { value: detectParam(value), operation: '<=' };
        }
        else if(value.substr(0, 1) === '<')
        {
            value = value.substr(1);
            parseTree[key] = { value: detectParam(value), operation: '<' };
        }
        else if(_.includes(value, ','))
        {
            parseTree[key] = arrayFilter(detectParam(value));
            parseTree[key] = { value: detectParam(value), operation: '=', isArray: true };
        }
        else
        {
            parseTree[key] = { value: detectParam(value), operation: '=' };
        } // end if
    });

    return parseTree;
} // end parseQuery

/**
 * @param queryObj
 * @param list
 */
export function filterByQuery(queryObj : Record<string, string>, list : QueryFilterVal[]) : unknown[]
{
    // Build filters
    const filters = {};
    _.forIn(parseQuery(queryObj), (token, key) =>
    {
        switch (token.operation)
        {
            case '@>':
                return filters[key] = containsFilter(token.value);

            case '>=':
                return filters[key] = gteFilter(token.value);

            case '>':
                return filters[key] = gtFilter(token.value);

            case '<=':
                return filters[key] = lteFilter(token.value);

            case '<':
                return filters[key] = ltFilter(token.value);

            case '=':
                return filters[key] = Array.isArray(token.value) ? arrayFilter(token.value) : eqFilter(token.value);

            default:
                logger.warn('Unknown query operation:', token.operation);
                break;
        } // end switch
    });

    // Filter the list
    return _.filter(list, (item) =>
    {
        let include = true;

        _.forIn(filters, (filter : (modelVal : QueryFilterVal) => boolean, key : string) =>
        {
            const value = item[key];
            if(filter)
            {
                include = filter(value);
            } // en if
        });

        return include;
    });
} // end filterByQuery

//----------------------------------------------------------------------------------------------------------------------
