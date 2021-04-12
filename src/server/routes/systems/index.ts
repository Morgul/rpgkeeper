//----------------------------------------------------------------------------------------------------------------------
// Routes for system operations
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import express from 'express';

// Managers
import * as permMan from '../../managers/permissions';
import systemMan from '../../managers/system';

// Utils
import { errorHandler, interceptHTML } from '../utils';
import { Account } from '../../models/account';

// Sub-routes
import eoteRouter from './eote';
import genRouter from './genesys';

//----------------------------------------------------------------------------------------------------------------------

import logging from 'trivial-logging';
const logger = logging.loggerFor(module);

const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------

router.get('/', (request, response) =>
{
    interceptHTML(response, async() =>
    {
        const systems = systemMan.systems
            .filter((system) =>
            {
                const user = _.get(request, 'user', { permissions: [], groups: [] });
                return permMan.hasPerm(user as Account, 'Systems/viewDisabled') || system.status !== 'disabled';
            });

        response.json(systems);
    });
});

//----------------------------------------------------------------------------------------------------------------------
// Sub Routes
//----------------------------------------------------------------------------------------------------------------------

router.use('/eote', eoteRouter);
router.use('/genesys', genRouter);

//----------------------------------------------------------------------------------------------------------------------
// Error Handling
//----------------------------------------------------------------------------------------------------------------------

router.use(errorHandler(logger));

//----------------------------------------------------------------------------------------------------------------------

export default router;

//----------------------------------------------------------------------------------------------------------------------
