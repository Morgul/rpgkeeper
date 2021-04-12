//----------------------------------------------------------------------------------------------------------------------
// Routes for Characters
//----------------------------------------------------------------------------------------------------------------------

import express from 'express';

// Managers
import * as accountMan from '../managers/account';
import * as charMan from '../managers/character';
import * as permsMan from '../managers/permissions';
import sysMan from '../managers/system';

// Utils
import { ensureAuthenticated, errorHandler, interceptHTML, parseQuery, wrapAsync } from './utils';
import { Account } from '../models/account';

// Logger
import logging from 'trivial-logging';
const logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------

router.get('/', async(req, resp) =>
{
    interceptHTML(resp, async() =>
    {
        // If we pass in `owner`, it'll be an email address, so we need to look that up first, and shove the correct
        // account id into the filters as if that was passed in.
        let owner = req.query.owner;
        if(owner)
        {
            delete req.query.owner;

            if(Array.isArray(owner))
            {
                owner = owner[0];
            } // end if

            if(typeof owner === 'string')
            {
                owner = owner.toLowerCase();
                const account = await accountMan.getByEmail(owner);
                req.query.accountID = `${ account.id }`;
            } // end if
        } // end if

        const filters = parseQuery(req.query as Record<string, string>);
        resp.json(await charMan.list(filters));
    });
});

router.post('/', ensureAuthenticated, wrapAsync(async(req, resp) =>
{
    const char = { ...req.body };
    const system = sysMan.get(char.system);

    if(system)
    {
        resp.json(await charMan.add((req.user as Account).id, char));
    }
    else
    {
        resp.status(422)
            .json({
                type: 'InvalidCharacter',
                message: `The character with id '${ char.id }' has an invalid or unknown system '${ char.system }'.`
            });
    } // end if
}));

router.get('/:charID', (req, resp) =>
{
    interceptHTML(resp, async() =>
    {
        resp.json(await charMan.get(req.params.charID));
    });
});

router.patch('/:charID', ensureAuthenticated, wrapAsync(async(req, resp) =>
{
    // First, retrieve the character
    const char = await charMan.get(req.params.charID);

    // Next, get the system
    const system = sysMan.get(char.system);

    if(system)
    {
        // Allow either the owner, or moderators/admins to modify the character
        if(char.accountID === (req.user as Account).id || permsMan.hasPerm(req.user as Account, `${ char.system }/canModifyChar`))
        {
            // Update the character
            resp.json(await charMan.update(req.params.charID, req.body));
        }
        else
        {
            resp.status(422)
                .json({
                    type: 'InvalidCharacter',
                    message: `The character with id '${ char.id }' has an invalid or unknown system '${ char.system }'.`
                });
        } // end if
    }
    else
    {
        resp.status(403)
            .json({
                type: 'NotAuthorized',
                message: `You are not authorized to update character '${ req.params.charID }'.`
            });
    } // end if
}));

router.delete('/:charID', ensureAuthenticated, wrapAsync(async(req, resp) =>
{
    let char;
    try
    {
        // First, retrieve the character
        char = await charMan.get(req.params.charID);
    }
    catch (error)
    {
        // If we can't find the character, we need to emulate the behavior of the other delete endpoints, and return a
        // 404 with no body. While this isn't technically necessary, I'd prefer the API to remain consistent.
        if(error.code === 'ERR_NOT_FOUND')
        {
            return resp.status(404).end();
        }
        else
        {
            throw error;
        } // end if
    } // end try/catch

    // Allow either the owner, or moderators/admins to delete the character
    if(char.accountID === (req.user as Account).id || permsMan.hasPerm(req.user as Account, `${ char.system }/canDeleteChar`))
    {
        // Delete the character
        resp.json(await charMan.remove(req.params.charID));
    }
    else
    {
        resp.status(403)
            .json({
                type: 'NotAuthorized',
                message: `You are not authorized to update character '${ req.params.charID }'.`
            });
    } // end if
}));

//----------------------------------------------------------------------------------------------------------------------
// Error Handling
//----------------------------------------------------------------------------------------------------------------------

router.use(errorHandler(logger));

//----------------------------------------------------------------------------------------------------------------------

export default router;

//----------------------------------------------------------------------------------------------------------------------
