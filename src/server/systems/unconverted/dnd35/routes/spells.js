//----------------------------------------------------------------------------------------------------------------------
/// Spells Router
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
// Spells Endpoint
//----------------------------------------------------------------------------------------------------------------------

router.get('/', (req, resp) => 
{
    return models.Spell.all()
        .then((spells) =>
        {
            resp.json(spells);
        })
        .catch(models.errors.DocumentNotFound, (error) =>
        {
            logger.warn('Spell not found:\n', error.stack);

            resp.status(404).json({
                human: 'Spell not found.',
                message: error.message
            });
        })
        .catch((err) => 
        {
            console.error('error:', err.stack);
            resp.status(500).json({ error: err.message, stack: err.stack });
        });
});

router.get('/:spellID', (req, resp) => 
{
    return models.Spell.get(req.params.spellID)
        .then((spell) =>
        {
            resp.json(spell);
        })
        .catch(models.errors.DocumentNotFound, (error) =>
        {
            logger.warn('Spell not found:\n', error.stack);

            resp.status(404).json({
                human: 'Spell not found.',
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
