//----------------------------------------------------------------------------------------------------------------------
// Utilities to make express routes use less boilerplate.
//----------------------------------------------------------------------------------------------------------------------

import fs from 'fs';
import path from 'path';

import { TrivialLogger } from 'trivial-logging';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors';

//----------------------------------------------------------------------------------------------------------------------

export type MiddlewareFunction = (request : Request, response : Response, next : NextFunction) => void;
export type ErrorMiddlewareFunction = (error : AppError, request : Request, response : Response, next : NextFunction) => void;
export type JsonHandlerFunction = (request : Request, response : Response, next ?: NextFunction) => Promise<unknown>;

//----------------------------------------------------------------------------------------------------------------------

/**
 * Basic request logging
 *
 * @param logger - The logger to use.
 *
 * @returns Returns a middleware function to perform logging.
 */
export function requestLogger(logger : TrivialLogger) : MiddlewareFunction
{
    return (request, _response, next) =>
    {
        logger.debug(`${ request.method } '${ request.url }'`);
        next();
    }; // end loggerFunc
} // end requestLogger

/**
 * Basic error logging
 *
 * @param logger - The logger to use.
 *
 * @returns Returns a middleware function to perform logging.
 */
export function errorLogger(logger : TrivialLogger) : ErrorMiddlewareFunction
{
    return (error, request, response, next) =>
    {
        const childLogger = logger.child({
            request: {
                method: request.method,
                url: request.url,
                body: request.body,
                query: request.query
            }
        });

        if(response.statusCode < 500)
        {
            childLogger.warn(`${ request.method } ${ response.statusCode } '${ request.url }': ${ error.stack }`);
        }
        else
        {
            childLogger.error(`${ request.method } ${ response.statusCode } '${ request.url }': ${ error.stack }`);
        } // end if

        next(error);
    }; // end loggerFunc
} // end errorLogger

/**
 * Build a custom error logger
 *
 * @param logger - The logger to use.
 *
 * @returns Returns a middleware function to perform logging.
 */
export function errorHandler(logger : TrivialLogger) : ErrorMiddlewareFunction
{
    // If we don't have 4 parameters, this function literally doesn't work.
    // eslint-disable-next-line no-unused-vars
    return (error, request, response, _next) =>
    {
        let errorJSON = {};
        if(typeof error.toJSON == 'function')
        {
            errorJSON = error.toJSON();
        }
        else
        {
            errorJSON = {
                name: error.constructor.name,
                message: error.message,
                code: error.code,
                error
            };
        } // end if

        response.status(error.statusCode || 500);

        if(logger)
        {
            const childLogger = logger.child({
                request: {
                    method: request.method,
                    url: request.url,
                    body: request.body,
                    query: request.query
                }
            });

            if(response.statusCode < 500)
            {
                childLogger.warn(`${ request.method } ${ response.statusCode } '${ request.url }': ${ error.stack }`);
            }
            else
            {
                childLogger.error(`${ request.method } ${ response.statusCode } '${ request.url }': ${ error.stack }`);
            } // end if
        } // end if

        response.json(errorJSON);
    }; // end apiErrorHandler
} // end errorHandler

/**
 * Serves index page.
 *
 * @param _request - Express request.
 * @param response - Express response.
 */
export function serveIndex(_request : Request, response : Response) : void
{
    response.setHeader('Content-Type', 'text/html');
    fs.createReadStream(path.resolve(__dirname, '..', '..', '..', 'client', 'index.html')).pipe(response);
} // end serveIndex

/**
 * Either serve 'index.html', or run json handler
 *
 * @param response - Express response.
 * @param jsonHandler - Handler function for the json portion of the request.
 * @param skipAuthCheck - Should we skip checking authentication?
 */
export function interceptHTML(response : Response, jsonHandler : JsonHandlerFunction, skipAuthCheck = false) : void
{
    response.format({
        html: serveIndex,
        json(request, resp, next)
        {
            if(!skipAuthCheck || request.isAuthenticated())
            {
                Promise.resolve(jsonHandler(request, resp)).catch(next);
            }
            else
            {
                resp.status(401).json({
                    name: 'NotAuthorized',
                    message: `Not authorized.`
                });
            } // end if
        }
    });
} // end interceptHTML

/**
 * Ensures that the user is authenticated, or it returns a 401.
 *
 * @param request - Express request.
 * @param response - Express response.
 * @param next - Express next function.
 */
export function ensureAuthenticated(request : Request, response : Response, next : NextFunction) : void
{
    if(request.isAuthenticated())
    {
        next();
    }
    else
    {
        response.status(401).json({
            name: 'NotAuthorized',
            message: `Not authorized.`
        });
    } // end if
} // end ensureAuthenticated

/**
 * Wraps a router function in an async handler.
 *
 * @param handler - Express router function.
 *
 * @returns Express router function.
 */
export function wrapAsync(handler : JsonHandlerFunction) : MiddlewareFunction
{
    return function(req, res, next)
    {
        // Make sure to `.catch()` any errors and pass them along to the `next()` middleware in the chain
        handler(req, res, next).catch(next);
    };
} // ebd wrapAsync

//----------------------------------------------------------------------------------------------------------------------
