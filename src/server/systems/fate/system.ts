//----------------------------------------------------------------------------------------------------------------------
// Fate System
//----------------------------------------------------------------------------------------------------------------------

// BaseClass
import { BaseSystem } from '../base';

// Defaults
import defaults from './defaults';

// Logger
import logging from 'trivial-logging';
const logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------
// System definition
//----------------------------------------------------------------------------------------------------------------------

const id = 'fate';
const name = 'FATE: Core System';
const description = 'Fate is a generic role-playing game system based on the Fudge gaming system. It has no fixed setting, traits, or genre and is customizable. It is designed to offer minimal obstruction to role-playing by assuming players want to make fewer dice rolls.';

class FATESystem extends BaseSystem
{
    constructor()
    {
        super(id, name, description, defaults.character);

        logger.info(`Loaded '${ name }' system.`);
    } // end constructor
} // end FATESystem

//----------------------------------------------------------------------------------------------------------------------

export default new FATESystem();

//----------------------------------------------------------------------------------------------------------------------
