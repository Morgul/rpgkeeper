//----------------------------------------------------------------------------------------------------------------------
// Database models for RPGKeeper
//
// @module models
//----------------------------------------------------------------------------------------------------------------------

import trivialModels from 'trivialmodels';

//----------------------------------------------------------------------------------------------------------------------

const types = trivialModels.types;
const db = { errors: trivialModels.errors };

//----------------------------------------------------------------------------------------------------------------------

db.Character = trivialModels.define({
    name: 'Character',
    driver: {
        name: 'TrivialDB',
        options: {
            name: 'characters',
            dbPath: 'server/db',
            namespace: 'v20'
        }
    },
    schema: {
        id: types.String({ pk: true }),

        nature: types.String(),
        demeanor: types.String(),
        concept: types.String(),
        clan: types.String(),
        generation: types.Number({ integer: true }),
        sire: types.String(),

        // Attributes
        strength: types.Number({ integer: true }),
        dexterity: types.Number({ integer: true }),
        stamina: types.Number({ integer: true }),
        charisma: types.Number({ integer: true }),
        manipulation: types.Number({ integer: true }),
        appearance: types.Number({ integer: true }),
        perception: types.Number({ integer: true }),
        intelligence: types.Number({ integer: true }),
        wits: types.Number({ integer: true }),

        // Abilities

        notes: types.Array({ default: [] }),
        user: types.String({ required: true })
    }
});

//----------------------------------------------------------------------------------------------------------------------

export default db;

//----------------------------------------------------------------------------------------------------------------------
