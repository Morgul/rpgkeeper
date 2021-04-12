// ---------------------------------------------------------------------------------------------------------------------
// EotE Decoders
// ---------------------------------------------------------------------------------------------------------------------

import {
    array,
    boolean,
    Decoder,
    either,
    nullable,
    object,
    optional,
    positiveInteger,
    regex,
    string,
    truthy
} from 'decoders';

// Defaults
import defaults from '../../systems/eote/defaults';

// Utils
import {
    boundedInteger,
    enumStr,
    jsonArrayString,
    jsonObjectString,
    nullToUndefined,
    stringWithLength,
    withDefault
} from '../utils';
import { MissingDecoderError } from '../../errors';

// ---------------------------------------------------------------------------------------------------------------------

const { genesys, eote } = defaults;

const {
    motivations,
    characteristics,
    experience,
    defenses,
    health,
    abilities,
    gear,
    armor,
    weapons
} = genesys.character;

const { force } = eote.character;

// ---------------------------------------------------------------------------------------------------------------------

export const eoteRangeDecoder = enumStr([ 'en', 's', 'm', 'l', 'ex' ]);
export const referenceDecoder = withDefault(regex(/^[a-zA-z-]+:?\d*$/, 'Must be a valid reference string.'), 'HB');

export const eoteCriticalInjury = object({
    name: stringWithLength(1, 255),
    value: positiveInteger
});

export const motivationDecoder = object({
    id: optional(positiveInteger),
    name: stringWithLength(0, 255),
    type: enumStr([ 'strength', 'flaw', 'desire', 'fear' ]),
    description: string,
    reference: referenceDecoder,
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

// ---------------------------------------------------------------------------------------------------------------------
// Supplements
// ---------------------------------------------------------------------------------------------------------------------

export const abilityDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const talentDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    activation: enumStr([ 'p', 'ai', 'aio', 'am', 'aa' ]),
    ranked: truthy,
    tier: boundedInteger(1, 5),
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const skillDecoder = object({
    name: stringWithLength(1, 255),
    characteristic: enumStr([ 'brawn', 'agility', 'intellect', 'cunning', 'willpower', 'presence' ]),
    ranks: boundedInteger(0, 5),
    career: truthy,
    type: enumStr([ 'general', 'combat', 'magic', 'social', 'knowledge' ])
});

export const gearDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    encumbrance: positiveInteger,
    rarity: positiveInteger,
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const attachmentDecoder = object({
    id: optional(positiveInteger),
    description: optional(stringWithLength(1)),
    useWith: stringWithLength(1, 255),
    modifiers: stringWithLength(1),
    hpRequired: boundedInteger(0, 50),
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const qualityDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    passive: truthy,
    ranked: truthy,
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const armorDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    defense: positiveInteger,
    soak: positiveInteger,
    hardpoints: positiveInteger,
    encumbrance: positiveInteger,
    rarity: positiveInteger,
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const weaponDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    skill: stringWithLength(1, 255),
    damage: positiveInteger,
    criticalRating: positiveInteger,
    range: eoteRangeDecoder,
    encumbrance: positiveInteger,
    rarity: positiveInteger,
    qualities: withDefault(either(
        jsonArrayString(object({ id: positiveInteger, ranks: optional(boundedInteger(1)) })),
        array(object({ id: positiveInteger, ranks: optional(boundedInteger(1)) }))
    ), []),
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const eoteTalentDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    activation: enumStr([ 'p', 'ai', 'aio', 'am', 'aa' ]),
    ranked: truthy,
    trees: stringWithLength(1),
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const eoteAttachmentDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    baseModifier: stringWithLength(1),
    modOptions: stringWithLength(1),
    hpRequired: boundedInteger(0, 50),
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

export const forcePowerUpgradeDecoder = object({
    available: positiveInteger,
    description: stringWithLength(1)
});

export const forcePowerDecoder = object({
    id: optional(positiveInteger),
    description: stringWithLength(1),
    minRating: positiveInteger,
    upgrades: withDefault(jsonObjectString(object({
        strength: optional(forcePowerUpgradeDecoder),
        magnitude: optional(forcePowerUpgradeDecoder),
        duration: optional(forcePowerUpgradeDecoder),
        range: optional(forcePowerUpgradeDecoder),
        control: optional(array(object({ description: stringWithLength(1) }))),
        mastery: optional(forcePowerUpgradeDecoder)
    })), {}),
    reference: referenceDecoder,
    name: stringWithLength(1, 255),
    owner: nullToUndefined(optional(string)),
    scope: withDefault(enumStr([ 'public', 'user' ]), 'user'),
    official: withDefault(truthy, false) // This is 'truthy', because sqlite returns 0 or 1 for booleans.
});

// ---------------------------------------------------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------------------------------------------------

const baseSysDetailsPartial = {
    career: stringWithLength(0, 255),
    species: stringWithLength(0, 255),
    characteristics: withDefault(object({
        brawn: boundedInteger(0, 10),
        agility: boundedInteger(0, 10),
        intellect: boundedInteger(0, 10),
        cunning: boundedInteger(0, 10),
        willpower: boundedInteger(0, 10),
        presence: boundedInteger(0, 10)
    }), characteristics),
    experience: withDefault(object({
        total: positiveInteger,
        available: positiveInteger
    }), experience),
    defenses: withDefault(object({
        soak: positiveInteger,
        melee: positiveInteger,
        ranged: positiveInteger
    }), defenses),
    health: withDefault(object({
        wounds: positiveInteger,
        woundThreshold: positiveInteger,
        strain: positiveInteger,
        strainThreshold: positiveInteger,
        criticalInjuries: array(eoteCriticalInjury),
        stimsUsed: positiveInteger,
        staggered: boolean,
        immobilized: boolean,
        disoriented: boolean
    }), health),
    abilities: withDefault(array(positiveInteger), abilities),
    gear: withDefault(array(gearDecoder), gear),
    armor: withDefault(object({
        name: stringWithLength(0, 255),
        description: optional(stringWithLength(1)),
        defense: positiveInteger,
        soak: positiveInteger,
        hardpoints: positiveInteger,
        encumbrance: positiveInteger,
        rarity: positiveInteger,
        attachments: withDefault(array(positiveInteger), []),
        qualities: array(object({ id: positiveInteger, ranks: optional(boundedInteger(1)) })),
        notes: optional(string)
    }), armor),
    weapons: withDefault(array(object({
        name: stringWithLength(1, 255),
        description: optional(stringWithLength(1)),
        skill: stringWithLength(1, 255),
        damage: positiveInteger,
        criticalRating: positiveInteger,
        range: eoteRangeDecoder,
        encumbrance: positiveInteger,
        rarity: positiveInteger,
        attachments: withDefault(array(positiveInteger), []),
        qualities: array(object({ id: positiveInteger, ranks: optional(boundedInteger(1)) })),
        notes: optional(string)
    })), weapons)
};

export const genesysSysDetailsDecoder = object({
    ...baseSysDetailsPartial,
    motivations: withDefault(object({
        strength: nullable(positiveInteger),
        flaw: nullable(positiveInteger),
        desire: nullable(positiveInteger),
        fear: nullable(positiveInteger)
    }), motivations),
    skills: withDefault(array(skillDecoder), genesys.skills),
    talents: withDefault(array(object({
        id: positiveInteger,
        ranks: optional(boundedInteger(1)),
        notes: optional(string)
    })), eote.character.talents)
});

export const eoteSysDetailsDecoder = object({
    ...baseSysDetailsPartial,
    specialization: optional(stringWithLength(0, 255)),
    skills: withDefault(array(skillDecoder), eote.skills),
    talents: withDefault(array(object({
        id: positiveInteger,
        ranks: optional(boundedInteger(1)),
        notes: optional(string)
    })), eote.character.talents),
    force: withDefault(object({
        rating: positiveInteger,
        committed: positiveInteger, // TODO: The upper limit is really `rating`.
        powers: array(object({
            id: either(positiveInteger, stringWithLength(1)),
            upgrades: withDefault(object({
                strength: positiveInteger,
                magnitude: positiveInteger,
                duration: positiveInteger,
                range: positiveInteger,
                control: array(positiveInteger),
                mastery: positiveInteger
            }), { strength: 0, magnitude: 0, duration: 0, range: 0, control: [], mastery: 0 })
        })),
        sensitive: boolean
    }), force)
});

// ---------------------------------------------------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------------------------------------------------

export function getGenesysSupplementDecoder(type : string, system = 'genesys') : Decoder<unknown>
{
    switch (type)
    {
        case 'ability':
            return abilityDecoder;

        case 'armor':
            return armorDecoder;

        case 'attachment':
            return attachmentDecoder;

        case 'gear':
            return gearDecoder;

        case 'quality':
            return qualityDecoder;

        case 'talent':
            return talentDecoder;

        case 'weapon':
            return weaponDecoder;

        case 'motivation':
            return motivationDecoder;

        default:
            throw new MissingDecoderError(`${ system }/${ type }`);
    } // end switch
} // end getGenesysSupplementDecoder

export function getEotESupplementDecoder(type : string) : Decoder<unknown>
{
    switch (type)
    {
        case 'attachment':
            return eoteAttachmentDecoder;

        case 'talent':
            return eoteTalentDecoder;

        case 'forcepower':
            return forcePowerDecoder;

        default:
            return getGenesysSupplementDecoder(type, 'eote');
    } // end switch
} // end getEotESupplementDecoder

// ---------------------------------------------------------------------------------------------------------------------
