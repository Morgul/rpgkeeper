//----------------------------------------------------------------------------------------------------------------------
// Fate System
//----------------------------------------------------------------------------------------------------------------------

// BaseClass
const BaseSystem = require('../base');

// Validations
const schemas = require('./schema-validation');

// Defaults
const defaults = require('./defaults');

// Logger
const logger = require('trivial-logging').loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------
// System definition
//----------------------------------------------------------------------------------------------------------------------

const id = 'generic-experiment';
const name = 'Generic (Experiment)';
const description = 'A generic rpg system built using fable for the client ui code.'

class GenericRPG extends BaseSystem
{
    constructor()
    {
        super(id, name, description, schemas.character, defaults.character);

        logger.info(`Loaded '${ name }' system.`);
    }
}

//----------------------------------------------------------------------------------------------------------------------

module.exports = new GenericRPG();

//----------------------------------------------------------------------------------------------------------------------
