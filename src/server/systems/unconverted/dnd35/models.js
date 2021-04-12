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
            namespace: 'dnd35'
        }
    },
    schema: {
        // The base character
        id: types.String({ pk: true }),

        // Class and level
        classes: types.Array({
            schema: {
                classID: types.String({ required: true }),
                level: types.Number({ integer: true })
            },
            default: []
        }),

        // Basic Biographic info
        raceID: types.String(),
        age: types.Number({ integer: true }),
        height: types.String(),
        gender: types.Enum({ values: [ 'M', 'F', 'O' ] }),
        alignment: types.Enum({ values: [ 'LG', 'NG', 'CG', 'LN', 'N', 'CN', 'LE', 'NE', 'CE' ] }),
        speed: types.Number({ integer: true }),
        languages: types.Array({
            schema: types.String(),
            default: [ 'Common' ]
        }),

        // Abilities
        strength: types.Number({ integer: true }),
        dexterity: types.Number({ integer: true }),
        constitution: types.Number({ integer: true }),
        intelligence: types.Number({ integer: true }),
        wisdom: types.Number({ integer: true }),
        charisma: types.Number({ integer: true }),

        // Health
        hp: types.Object({
            schema: {
                max: types.Number({ integer: true }),
                nonlethal: types.Number({ integer: true }),
                current: types.Number({ integer: true }),
                temp: types.Number({ integer: true })
            }
        }),
        damageReduction: types.Array({
            schema: {
                amount: types.Number({ integer: true, required: true }),
                type: types.String({ required: true })
            },
            default: []
        }),

        // Combat
        baseAttackBonus: types.Number({ integer: true }),
        spellResistance: types.Number({ integer: true }),
        attacks: types.Array({
            schema: {
                name: types.String({ required: true }),
                attackBonus: types.Number({ integer: true, required: true }),
                damage: types.Number({ integer: true, required: true }),
                critical: types.String({ required: true }),
                range: types.String({ required: true }),
                type: types.String({ required: true }),
                ammunition: types.Number({ integer: true, required: true }),
                notes: types.String({ required: true })
            },
            default: []
        }),

        // Additional Character details
        experience: types.Number({ integer: true }),
        wealth: types.Number(),
        skills: types.Array({
            schema: {
                name: types.String({ required: true }),
                ability: types.Enum({
                    values: [ 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ]
                }),
                ranks: types.Number({ integer: true, required: true }),
                armorPenalty: types.Boolean({ default: false }),
                untrained: types.Boolean({ default: true }),
                hidden: types.Boolean({ default: false })
            },
            default: []
        }),
        bonuses: types.Array({
            schema: {
                name: types.String({ required: true }),
                type: types.String({ required: true, default: 'untyped' }),
                value: types.Number({ integer: true, required: true }),
                source: types.String(),
                stacks: types.Boolean({ default: false })
            },
            default: []
        }),
        feats: types.Array({
            schema: {
                featID: types.String({ required: true }),
                notes: types.String()
            },
            default: []
        }),
        specialAbilities: types.Array({
            schema: {
                name: types.String({ required: true }),
                type: types.String(),
                description: types.String({ required: true }),
                source: types.String({ required: true }),
                notes: types.String()
            },
            default: []
        }),

        // Magic
        spells: types.Array({
            schema: {
                spellID: types.String({ required: true }),
                preparations: types.Number({ integer: true }),
                notes: types.String()
            },
            default: []
        }),
        spellSave: types.Number({ integer: true }),
        spellFailure: types.Number({ integer: true }),
        spellLevels: types.Array({
            schema: {
                level: types.Number({ integer: true, required: true }),
                spellsKnown: types.Number({ integer: true }),
                spellsPerDay: types.Number({ integer: true }),
                spellSaveDC: types.Number({ integer: true }),
                bonusSpells: types.Number({ integer: true })
            },
            default: [
                { level: 0, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 1, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 2, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 3, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 4, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 5, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 6, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 7, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 8, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 },
                { level: 9, spellsKnown: 0, spellsPerDay: 0, spellSaveDC: null, bonusSpells: 0 }
            ]
        }),

        // Equipment
        armor: types.Object({
            schema: {
                name: types.String(),
                acBonus: types.Number({ integer: true }),
                maxDex: types.Number({ integer: true }),
                checkPenalty: types.Number({ integer: true }),
                spellFailure: types.Number({ integer: true }),
                speed: types.Number({ integer: true }),
                weight: types.Number({ integer: true }),
                special: types.String()
            }
        }),
        shield: types.Object({
            schema: {
                name: types.String(),
                acBonus: types.Number({ integer: true }),
                maxDex: types.Number({ integer: true }),
                checkPenalty: types.Number({ integer: true }),
                spellFailure: types.Number({ integer: true }),
                special: types.String()
            }
        }),
        protectiveItem1: types.Object({
            schema: {
                name: types.String(),
                acBonus: types.Number({ integer: true }),
                weight: types.Number({ integer: true }),
                special: types.String()
            }
        }),
        protectiveItem2: types.Object({
            schema: {
                name: types.String(),
                acBonus: types.Number({ integer: true }),
                weight: types.Number({ integer: true }),
                special: types.String()
            }
        }),
        items: types.Array({
            schema: {
                name: types.String(),
                price: types.Number({ integer: true }),
                weight: types.Number({ integer: true })
            },
            default: []
        }),

        // Misc
        rolls: types.Array({
            schema: {
                name: types.String({ required: true }),
                expression: types.String({ required: true })
            },
            default: []
        }),
        notes: types.Array({
            schema: {
                name: types.String({ required: true }),
                content: types.String({ required: true })
            },
            default: []
        }),
        conditions: types.Array({
            schema: {
                condition: types.String({ required: true }),
                duration: types.String({ default: 'Unspecified.' })
            },
            default: []
        }),

        // The owner of the character
        user: types.String({ required: true })
    }
});

db.Race = trivialModels.define({
    name: 'Race',
    driver: {
        name: 'TrivialDB',
        options: {
            name: 'races',
            dbPath: 'server/db',
            namespace: 'dnd35'
        }
    },
    schema: {
        id: types.String({ pk: true }),
        name: types.String({ required: true }),
        size: types.Enum({ values: [ 'T', 'S', 'M', 'L', 'H', 'G' ] }),
        speed: types.Number({ integer: true }),
        description: types.String(),
        traits: types.Array({
            schema: {
                name: types.String({ required: true }),
                description: types.String({ required: true })
            },
            default: []
        }),
        source: types.String({ required: true }),
        official: types.Boolean({ default: false }),
        owner: types.String()
    }
});

db.Class = trivialModels.define({
    name: 'Class',
    driver: {
        name: 'TrivialDB',
        options: {
            name: 'classes',
            dbPath: 'server/db',
            namespace: 'dnd35'
        }
    },
    schema: {
        id: types.String({ pk: true }),
        name: types.String({ required: true }),
        description: types.String(),
        features: types.Array({
            schema: {
                name: types.String({ required: true }),
                type: types.String(),
                description: types.String({ required: true })
            },
            default: []
        }),
        source: types.String({ required: true }),
        official: types.Boolean({ default: false }),
        owner: types.String()
    }
});

db.Feat = trivialModels.define({
    name: 'Feats',
    driver: {
        name: 'TrivialDB',
        options: {
            name: 'feats',
            dbPath: 'server/db',
            namespace: 'dnd35'
        }
    },
    schema: {
        id: types.String({ pk: true }),
        name: types.String({ required: true }),
        prerequisite: types.String(),
        benefit: types.String(),
        normal: types.String(),
        special: types.String(),
        source: types.String({ required: true }),
        official: types.Boolean({ default: false }),
        owner: types.String()
    }
});

db.Spell = trivialModels.define({
    name: 'Spells',
    driver: {
        name: 'TrivialDB',
        options: {
            name: 'spells',
            dbPath: 'server/db',
            namespace: 'dnd35'
        }
    },
    schema: {
        id: types.String({ pk: true }),
        name: types.String({ required: true }),
        school: types.String({ required: true }),
        subSchool: types.String(),
        typeDescriptor: types.String(),
        level: types.Array({
            schema: {
                level: types.Number({ integer: true, required: true }),
                class: types.String({ required: true })
            },
            default: []
        }),
        components: types.Array({
            schema: types.String(),
            default: []
        }),
        castingTime: types.String({ required: true }),
        range: types.String({ required: true }),
        target: types.String(),
        effect: types.String(),
        area: types.String(),
        duration: types.String(),
        savingThrow: types.String(),
        spellResistance: types.String(),
        description: types.String(),
        arcaneFocus: types.String(),
        official: types.Boolean({ default: false }),
        owner: types.String({ required: true })
    }
});

//----------------------------------------------------------------------------------------------------------------------

export default db;

//----------------------------------------------------------------------------------------------------------------------
