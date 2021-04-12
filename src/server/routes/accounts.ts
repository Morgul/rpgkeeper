//----------------------------------------------------------------------------------------------------------------------
// Routes for Accounts
//----------------------------------------------------------------------------------------------------------------------

import express from 'express';

import { ensureAuthenticated, errorHandler, wrapAsync } from './utils';

// Managers
import * as accountMan from '../managers/account';

import { Account } from '../models/account';
import * as permsMan from '../managers/permissions';

// Logger
import logging from 'trivial-logging';
const logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------

router.get('/', wrapAsync(async(req, resp) =>
{
    const filters = { id: req.query.id, email: req.query.email, name: req.query.name };
    resp.json((await accountMan.list(filters)).map((accountObj) =>
    {
        const { permissions, settings, groups, ...restAccount } = accountObj;
        return restAccount;
    }));
}));

router.get('/:accountID', wrapAsync(async(req, resp) =>
{
    const user = req.user as Account;
    const account = await accountMan.get(req.params.accountID);

    const sameOrAdmin = user && (user.id === req.params.accountID || permsMan.hasPerm(user, `Accounts/canViewDetails`));

    if(req.isAuthenticated() && sameOrAdmin)
    {
        resp.json(account);
    }
    else
    {
        const { permissions, groups, settings, ...restAccount } = account;
        resp.json(restAccount);
    } // end if
}));

router.patch('/:accountID', ensureAuthenticated, wrapAsync(async(req, resp) =>
{
    // Update the account
    const newAccount = await accountMan.update(req.params.accountID, req.body);
    resp.json(newAccount);
}));

//----------------------------------------------------------------------------------------------------------------------
// Error Handling
//----------------------------------------------------------------------------------------------------------------------

router.use(errorHandler(logger));

//----------------------------------------------------------------------------------------------------------------------

export default router;

//----------------------------------------------------------------------------------------------------------------------
