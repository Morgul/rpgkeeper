//----------------------------------------------------------------------------------------------------------------------
// Routes for Edge of the Empire system
//----------------------------------------------------------------------------------------------------------------------

import express from 'express';

// Managers
import refMan from '../../managers/references';

// Utils
import { buildSupplementRoute } from './utils/supplement';
import { errorHandler, wrapAsync, parseQuery } from '../utils';

// Logger
import logging from 'trivial-logging';
const logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------

buildSupplementRoute(router, '/abilities', 'ability', 'eote');
buildSupplementRoute(router, '/armor', 'armor', 'eote');
buildSupplementRoute(router, '/attachments', 'attachment', 'eote');
buildSupplementRoute(router, '/gear', 'gear', 'eote');
buildSupplementRoute(router, '/qualities', 'quality', 'eote');
buildSupplementRoute(router, '/talents', 'talent', 'eote');
buildSupplementRoute(router, '/weapons', 'weapon', 'eote');
buildSupplementRoute(router, '/forcepowers', 'forcepower', 'eote');

router.get('/references', wrapAsync(async(req, resp) =>
{
    const filters = parseQuery(req.query as Record<string, string>);
    resp.json(await refMan.getFiltered(filters, 'eote_reference'));
}));

//----------------------------------------------------------------------------------------------------------------------
// Error Handling
//----------------------------------------------------------------------------------------------------------------------

router.use(errorHandler(logger));

//----------------------------------------------------------------------------------------------------------------------

export default router;

//----------------------------------------------------------------------------------------------------------------------
