//----------------------------------------------------------------------------------------------------------------------
/// Classes Router
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import express from 'express';
import logging from 'omega-logger';

import models from '../models';

//----------------------------------------------------------------------------------------------------------------------

const logger = logging.loggerFor(module);

const router = express.Router();

//----------------------------------------------------------------------------------------------------------------------
// Classes Endpoint
//----------------------------------------------------------------------------------------------------------------------

router.get('/', (req, resp) => 
{
    return models.Class.all()
        .then((dndClasses) =>
        {
            resp.json(dndClasses);
        })
        .catch(models.errors.DocumentNotFound, (error) =>
        {
            logger.warn('Class not found:\n', error.stack);

            resp.status(404).json({
                human: 'Class not found.',
                message: error.message
            });
        })
        .catch((err) => 
        {
            console.error('error:', err.stack);
            resp.status(500).json({ error: err.message, stack: err.stack });
        });
});

router.get('/:dndClassID', (req, resp) => 
{
    return models.Class.get(req.params.dndClassID)
        .then((dndClass) =>
        {
            resp.json(dndClass);
        })
        .catch(models.errors.DocumentNotFound, (error) =>
        {
            logger.warn('Class not found:\n', error.stack);

            resp.status(404).json({
                human: 'Class not found.',
                message: error.message
            });
        })
        .catch((err) => 
        {
            console.error('error:', err.stack);
            resp.status(500).json({ error: err.message, stack: err.stack });
        });
});

//----------------------------------------------------------------------------------------------------------------------

export default router;

//----------------------------------------------------------------------------------------------------------------------
