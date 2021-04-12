//----------------------------------------------------------------------------------------------------------------------
// Genesys Model Defaults
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';

//----------------------------------------------------------------------------------------------------------------------

const ability = {
    id: undefined,
    name: '',
    description: '',
    reference: {
        source: '',
        page: undefined
    }
};

const genesysTalent = {
    id: undefined,
    name: '',
    description: '',
    activation: 'p',
    ranked: false,
    tier: 1,
    reference: {
        source: '',
        page: undefined
    }
};

const gear = {
    id: undefined,
    name: '',
    description: '',
    encumbrance: 1,
    rarity: 0,
    reference: {
        source: '',
        page: undefined
    }
};

const genesysAttachment = {
    id: undefined,
    name: '',
    description: '',
    useWith: '',
    modifiers: '',
    hpRequired: 0,
    reference: {
        source: '',
        page: undefined
    }
};

const quality = {
    id: undefined,
    name: '',
    description: '',
    passive: true,
    reference: {
        source: '',
        page: undefined
    }
};

const armor = {
    id: undefined,
    name: '',
    description: '',
    defense: 0,
    soak: 0,
    hardpoints: 0,
    encumbrance: 0,
    rarity: 0,
    reference: {
        source: '',
        page: undefined
    }
};

const weapon = {
    id: undefined,
    name: '',
    description: '',
    skill: '',
    damage: '',
    criticalRating: 0,
    range: 'en',
    encumbrance: 0,
    rarity: 0,
    qualities: [],
    reference: {
        source: '',
        page: undefined
    }
};

const genesysSkills = [
    // General
    { name: 'Alchemy', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Astrocartogrphy', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Athletics', characteristic: 'brawn', ranks: 0, career: false, type: 'general' },
    { name: 'Computers', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Cool', characteristic: 'presence', ranks: 0, career: false, type: 'general' },
    { name: 'Coordination', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Discipline', characteristic: 'willpower', ranks: 0, career: false, type: 'general' },
    { name: 'Driving', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Mechanics', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Medicine', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Operating', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Perception', characteristic: 'cunning', ranks: 0, career: false, type: 'general' },
    { name: 'Piloting', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Resilience', characteristic: 'brawn', ranks: 0, career: false, type: 'general' },
    { name: 'Riding', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Skulduggery', characteristic: 'cunning', ranks: 0, career: false, type: 'general' },
    { name: 'Stealth', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Streetwise', characteristic: 'cunning', ranks: 0, career: false, type: 'general' },
    { name: 'Survival', characteristic: 'cunning', ranks: 0, career: false, type: 'general' },
    { name: 'Vigilance', characteristic: 'willpower', ranks: 0, career: false, type: 'general' },

    // Magic
    { name: 'Arcana', characteristic: 'intellect', ranks: 0, career: false, type: 'magic' },
    { name: 'Divine', characteristic: 'willpower', ranks: 0, career: false, type: 'magic' },
    { name: 'Primal', characteristic: 'cunning', ranks: 0, career: false, type: 'magic' },

    // Combat
    { name: 'Brawl', characteristic: 'brawn', ranks: 0, career: false, type: 'combat' },
    { name: 'Gunnery', characteristic: 'agility', ranks: 0, career: false, type: 'combat' },
    { name: 'Melee', characteristic: 'brawn', ranks: 0, career: false, type: 'combat' },
    { name: 'Melee-Heavy', characteristic: 'brawn', ranks: 0, career: false, type: 'combat' },
    { name: 'Melee-Light', characteristic: 'brawn', ranks: 0, career: false, type: 'combat' },
    { name: 'Ranged', characteristic: 'agility', ranks: 0, career: false, type: 'combat' },
    { name: 'Ranged-Heavy', characteristic: 'agility', ranks: 0, career: false, type: 'combat' },
    { name: 'Ranged-Light', characteristic: 'agility', ranks: 0, career: false, type: 'combat' },

    // Social
    { name: 'Charm', characteristic: 'presence', ranks: 0, career: false, type: 'social' },
    { name: 'Coercion', characteristic: 'willpower', ranks: 0, career: false, type: 'social' },
    { name: 'Deception', characteristic: 'cunning', ranks: 0, career: false, type: 'social' },
    { name: 'Leadership', characteristic: 'presence', ranks: 0, career: false, type: 'social' },
    { name: 'Negotiation', characteristic: 'presence', ranks: 0, career: false, type: 'social' },

    // Knowledge
    { name: 'Knowledge', characteristic: 'intellect', ranks: 0, career: false, type: 'knowledge' }
];

const genesysChar = {
    career: '',
    species: '',
    motivations: {
        strength: null,
        flaw: null,
        desire: null,
        fear: null
    },
    characteristics: {
        brawn: 0,
        agility: 0,
        intellect: 0,
        cunning: 0,
        willpower: 0,
        presence: 0
    },
    experience: {
        total: 0,
        available: 0
    },
    defenses: {
        soak: 0,
        melee: 0,
        ranged: 0
    },
    health: {
        wounds: 0,
        woundThreshold: 0,
        strain: 0,
        strainThreshold: 0,
        criticalInjuries: [],
        stimsUsed: 0,
        staggered: false,
        immobilized: false,
        disoriented: false
    },
    skills: _.cloneDeep(genesysSkills),
    talents: [],
    abilities: [],
    gear: [],
    armor: {
        name: '',
        defense: 0,
        soak: 0,
        hardpoints: 0,
        encumbrance: 0,
        rarity: 0,
        attachments: [] as any[],
        qualities: [] as any[]
    },
    weapons: []
};

//----------------------------------------------------------------------------------------------------------------------
// EotE Model Defaults
//----------------------------------------------------------------------------------------------------------------------

const eoteTalent = {
    id: undefined,
    name: '',
    description: '',
    activation: 'p',
    ranked: false,
    trees: '',
    reference: {
        source: '',
        page: undefined
    }
};

const eoteAttachment = {
    id: undefined,
    name: '',
    description: '',
    baseModifier: '',
    modOptions: '',
    hpRequired: 0,
    reference: {
        source: '',
        page: undefined
    }
};

const forcePower = {
    id: undefined,
    name: '',
    description: '',
    minRating: 0,
    upgrades: {
        strength: {
            available: 0,
            description: ''
        },
        magnitude: {
            available: 0,
            description: ''
        },
        duration: {
            available: 0,
            description: ''
        },
        range: {
            available: 0,
            description: ''
        },
        control: [],
        mastery: {
            available: 0,
            description: ''
        }
    },
    reference: {
        source: '',
        page: undefined
    }
};

const eoteSkills = [
    // General
    { name: 'Astrogation', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Athletics', characteristic: 'brawn', ranks: 0, career: false, type: 'general' },
    { name: 'Computers', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Cool', characteristic: 'presence', ranks: 0, career: false, type: 'general' },
    { name: 'Coordination', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Discipline', characteristic: 'willpower', ranks: 0, career: false, type: 'general' },
    { name: 'Mechanics', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Medicine', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Operating', characteristic: 'intellect', ranks: 0, career: false, type: 'general' },
    { name: 'Perception', characteristic: 'cunning', ranks: 0, career: false, type: 'general' },
    { name: 'Piloting-Planetary', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Piloting-Space', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Resilience', characteristic: 'brawn', ranks: 0, career: false, type: 'general' },
    { name: 'Skulduggery', characteristic: 'cunning', ranks: 0, career: false, type: 'general' },
    { name: 'Stealth', characteristic: 'agility', ranks: 0, career: false, type: 'general' },
    { name: 'Streetwise', characteristic: 'cunning', ranks: 0, career: false, type: 'general' },
    { name: 'Survival', characteristic: 'cunning', ranks: 0, career: false, type: 'general' },
    { name: 'Vigilance', characteristic: 'willpower', ranks: 0, career: false, type: 'general' },

    // Combat
    { name: 'Brawl', characteristic: 'brawn', ranks: 0, career: false, type: 'combat' },
    { name: 'Gunnery', characteristic: 'agility', ranks: 0, career: false, type: 'combat' },
    { name: 'Melee', characteristic: 'brawn', ranks: 0, career: false, type: 'combat' },
    { name: 'Lightsaber', characteristic: 'brawn', ranks: 0, career: false, type: 'combat' },
    { name: 'Ranged-Heavy', characteristic: 'agility', ranks: 0, career: false, type: 'combat' },
    { name: 'Ranged-Light', characteristic: 'agility', ranks: 0, career: false, type: 'combat' },

    // Social
    { name: 'Charm', characteristic: 'presence', ranks: 0, career: false, type: 'social' },
    { name: 'Coercion', characteristic: 'willpower', ranks: 0, career: false, type: 'social' },
    { name: 'Deception', characteristic: 'cunning', ranks: 0, career: false, type: 'social' },
    { name: 'Leadership', characteristic: 'presence', ranks: 0, career: false, type: 'social' },
    { name: 'Negotiation', characteristic: 'presence', ranks: 0, career: false, type: 'social' },

    // Knowledge
    { name: 'Core Worlds', characteristic: 'intellect', ranks: 0, career: false, type: 'knowledge' },
    { name: 'Education', characteristic: 'intellect', ranks: 0, career: false, type: 'knowledge' },
    { name: 'Lore', characteristic: 'intellect', ranks: 0, career: false, type: 'knowledge' },
    { name: 'Outer Rim', characteristic: 'intellect', ranks: 0, career: false, type: 'knowledge' },
    { name: 'Underworld', characteristic: 'intellect', ranks: 0, career: false, type: 'knowledge' },
    { name: 'Xenology', characteristic: 'intellect', ranks: 0, career: false, type: 'knowledge' }
];

// Strip unneeded props
const { motivations, ...restGenesysChar } = genesysChar;

// Build EotEChar from existing pieces
const eoteChar = {
    ...restGenesysChar,
    force: {
        rating: 0,
        committed: 0,
        powers: [],
        sensitive: false
    },
    specialization: '',
    skills: _.cloneDeep(eoteSkills)
};

//----------------------------------------------------------------------------------------------------------------------

export default {
    genesys: {
        ability,
        gear,
        quality,
        armor,
        weapon,
        talent: genesysTalent,
        skills: genesysSkills,
        attachment: genesysAttachment,
        character: genesysChar
    },
    eote: {
        ability,
        gear,
        quality,
        armor,
        weapon,
        forcePower,
        talent: eoteTalent,
        skills: eoteSkills,
        attachment: eoteAttachment,
        character: eoteChar
    }
}; // end exports

//----------------------------------------------------------------------------------------------------------------------
