// ---------------------------------------------------------------------------------------------------------------------
// FATE Decoders
// ---------------------------------------------------------------------------------------------------------------------

import { array, boolean, object, optional, positiveInteger, string } from 'decoders';

// Defaults
import defaults from '../../systems/fate/defaults';

// Utils
import { arrayWithLength, enumStr, stringWithLength, withDefault } from '../utils';

// ---------------------------------------------------------------------------------------------------------------------

const { aspects, fatePoints, mentalStress, physicalStress, skills, stunts } = defaults.character;

// ---------------------------------------------------------------------------------------------------------------------

export const fateAspectDecoder = object({
    type: enumStr([ 'aspect', 'high concept', 'trouble', 'consequence' ]),
    detail: optional(string),
    healing: optional(boolean),
    value: optional(positiveInteger)
});

export const fateSkillsDecoder = object({
    name: string,
    rank: positiveInteger
});

export const fateStuntsDecoder = object({
    title: stringWithLength(1),
    description: stringWithLength(1)
});

export const fateSysDetailsDecoder = object({
    fatePoints: withDefault(object({
        refresh: positiveInteger,
        current: positiveInteger
    }), fatePoints),
    aspects: withDefault(array(fateAspectDecoder), aspects as Record<string, unknown>[]),
    skills: withDefault(array(fateSkillsDecoder), skills),
    extras: string,
    stunts: withDefault(array(fateStuntsDecoder), stunts),
    physicalStress: withDefault(arrayWithLength(boolean, 4, 5), physicalStress),
    mentalStress: withDefault(arrayWithLength(boolean, 4, 5), mentalStress)
});

// ---------------------------------------------------------------------------------------------------------------------
