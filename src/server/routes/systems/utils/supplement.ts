//----------------------------------------------------------------------------------------------------------------------
// SupplementUtils
//----------------------------------------------------------------------------------------------------------------------

import { IRouter } from 'express';

// Managers
import * as suppMan from '../../../managers/supplement';

// Models
import { Account } from '../../../models/account';

// Utils
import { ensureAuthenticated, wrapAsync, parseQuery } from '../../utils';

//----------------------------------------------------------------------------------------------------------------------

export function buildSupplementRoute(router : IRouter, path : string, type : string, systemPrefix : string) : void
{
    //------------------------------------------------------------------------------------------------------------------
    // Build Basic CRUD Routes for supplements
    //------------------------------------------------------------------------------------------------------------------

    router.get(path, wrapAsync(async(req, resp) =>
    {
        const filters = parseQuery(req.query as Record<string, string>);
        resp.json(await suppMan.list(filters, type, systemPrefix, req.user as Account));
    }));

    router.get(`${ path }/:suppID`, wrapAsync(async(req, resp) =>
    {
        const suppID = parseInt(req.params.suppID);
        if(Number.isFinite(suppID))
        {
            resp.json(await suppMan.get(suppID, type, systemPrefix, req.user as Account));
        }
        else
        {
            resp.status(404)
                .json({
                    type: 'NotFound',
                    message: `No ${ type } with id '${ suppID }' found.`
                });
        } // end if
    }));

    router.post(path, ensureAuthenticated, wrapAsync(async(req, resp) =>
    {
        resp.json(await suppMan.add(req.body, type, systemPrefix, req.user as Account));
    }));

    router.patch(`${ path }/:suppID`, ensureAuthenticated, wrapAsync(async(req, resp) =>
    {
        const suppID = parseInt(req.params.suppID);
        if(Number.isFinite(suppID))
        {
            resp.json(await suppMan.update(suppID, req.body, type, systemPrefix, req.user as Account));
        }
        else
        {
            resp.status(404)
                .json({
                    type: 'NotFound',
                    message: `No ${ type } with id '${ suppID }' found.`
                });
        } // end if
    }));

    router.delete(`${ path }/:suppID`, ensureAuthenticated, wrapAsync(async(req, resp) =>
    {
        const suppID = parseInt(req.params.suppID);
        if(Number.isFinite(suppID))
        {
            resp.json(await suppMan.remove(suppID, type, systemPrefix, req.user as Account));
        }
        else
        {
            resp.status(404)
                .json({
                    type: 'NotFound',
                    message: `No ${ type } with id '${ suppID }' found.`
                });
        } // end if
    }));
} // end buildSupplementRoute

//----------------------------------------------------------------------------------------------------------------------
