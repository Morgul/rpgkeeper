//----------------------------------------------------------------------------------------------------------------------
// Populate a default set of EotE/Genesys Abilities
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

import { sortBy } from '../../utils/misc';

//----------------------------------------------------------------------------------------------------------------------

interface Ability {
    id : number;
    name : string;
    description : string;
    reference : string;
    official : boolean;
    scope : 'public' | 'user' | 'campaign';
}

//----------------------------------------------------------------------------------------------------------------------

const genesysRefs : Record<string, string> = {
};

export async function seed(knex : Knex) : Promise<void>
{
    const abilities : Ability[] = [
    ];

    const eoteAbilities = abilities
        .concat([
            {
                id: -1,
                name: 'Bothan',
                description: 'Bothans begin the game with one rank in Streetwise. They still may not train Streetwise above rank 2 during character creation. They also start with one rank in the Convincing Demeanor ability.',
                reference: 'E-CRB:44',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Chiss',
                description: 'Chiss begin the game with one rank in Cool. Thy still may not train Cool above rank 2 during character creation.',
                reference: 'EtU:21',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Droid',
                description: 'Droids do not need to eat, sleep, or breath, and are unaffected by toxins or poisons. Droids have a cybernetic implant cap of 6, instead of their brawn rating. In addition, after selecting a career, a Droid Player Character may train one rank in six of the eight career skills (instead of the usual four). After selecting their first specialization, a Droid Player Character may train one rank in three of the four specialization skills (instead of the usual two).',
                reference: 'E-CRB:47',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Gand',
                description: 'Gands begin the game with one rank in Discipline.',
                reference: 'E-CRB:48',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Human',
                description: 'Humans start the game with one rank in two different non-career skills of their choice. They may not train these skills above rank two at character creation.',
                reference: 'E-CRB:48',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Kaleesh',
                description: 'Kaleesh have adapted to see very well in low-light conditions. This allows Kaleesh to remove up to <setback></setback> added to checks added to lighting conditions.',
                reference: 'HB',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Rodian',
                description: 'Rodians begin the game with one rank in Survival. Rodians start with one rank in the Expert Tracker talent.',
                reference: 'E-CRB:50',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Trandoshans',
                description: 'Trandoshans begin the game with one rank in Perception. They still may not train Perception about rank 2 during character creation.',
                reference: 'E-CRB:51',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Twi\'lek',
                description: 'Twi\'leks being the game with one rank in either Charm or Deception. They still may not train Charm or Deception above rank 2 during character creation. When making skill checks, Twi\'leks may remove <setback></setback> imposed due to arid or hot environmental conditions.',
                reference: 'E-CRB:54',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Wookie',
                description: 'Wookies begin the game with one rank in Brawl. They still may not train Brawl above rank 2 during character creation.',
                reference: 'E-CRB:53',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Awkward',
                description: 'These creatures have great physical strength but their bulk imposes severe limitations in flexibility and agility. They add <setback></setback><setback></setback><setback></setback> to all Brawl, Melee, and Coordination checks they\'re required to make.',
                reference: 'E-CRB:407',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Ammonia Breathers',
                description: 'One notable difference between the two main sub-species of Gand is that one had lungs and one does not. Those that have lungs breathe an ammonia gas mixture. Those without lungs do not respire and gain all necessary metabolic substances through food. When playing a Gand, each player chooses whether he wishes his character to have lungs or not. If he selects to be playing a lungless Gand, his character is immune to suffocation (but not the wounds suffered from being exposed to vacuum). If he chooses to play a gand with lungs, he starts the game with an ammonia respirator, and treats oxygen as a dangerous atmosphere with Rating 8. However, he gains +10 starting XP.',
                reference: 'E-CRB:48',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Claws',
                description: 'When a Trandoshan makes Brawl checks to deal damage to an opponent, he deals +1 damage and has a Critical Rating of 3.',
                reference: 'E-CRB:51',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Infravision',
                description: 'Chiss have adapted to be able to see in both the infrared and normal visual spectra. This enables Chiss characters to remove up to <setback></setback> added to checks by lighting conditions.',
                reference: 'EtU:21',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Inorganic',
                description: 'Does not gain the benefits of recovering with a bacta tank, stimpack, or Medicine check. Inorganic characters do recover naturally from resting, as their systems attempt self-repairs. Otherwise inorganic characters need to be tended with a Mechanics check, using the same difficulties and results of Medicine checks for organic beings. Due to their resilient metallic construction droids tart the game with one rank in the Enduring ability.',
                reference: 'E-CRB:47',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Ponderous',
                description: 'These creatures can never spend more than one maneuver moving per turn.',
                reference: 'E-CRB:407',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Regeneration',
                description: 'Whenever a Trandoshan would recover one or more wounds from natural rest or recuperation in a Bacta tank, he recovers one additional wound. He does not recover one additional wound when receiving first aid or then using a stimpack. Trandoshans can regrow lost limbs as well, though it usually takes at least a month before the limb is usable.',
                reference: 'E-CRB:51',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Mechanical Being',
                description: 'Droids cannot become Force sensitive, nor acquire a Force Rating by any means. Droids cannot use Force powers, and also cannot be affected by mind-altering Force powers.',
                reference: 'E-CRB:47',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Wookie Rage',
                description: 'When the Wookie suffers any wounds, he deals +1 damage with Brawl and Melee attacks. When suffering a Critical Injury, he deals +2 damage with Brawl and Melee attacks instead.',
                reference: 'E-CRB:53',
                official: true,
                scope: 'public'
            }
        ])
        .map((ability, index) =>
        {
            ability.id = index + 1;
            return ability;
        })
        .sort(sortBy('id'));

    const genesysAbilities = abilities
        .concat([
            {
                id: -1,
                name: 'Ready for Anything',
                description: 'Once per session, as an out-of-turn incident, you may move one Story Point from the GM\'s pool to the player\'s pool.',
                reference: 'G-CRB:36',
                official: true,
                scope: 'public'
            }
        ])
        .map((ability, index) =>
        {
            ability.id = index + 1;

            const ref = genesysRefs[ability.name];
            if(ref)
            {
                ability.reference = ref;
            }

            return ability;
        })
        .sort(sortBy('id'));

    // Deletes ALL existing entries
    await knex('eote_ability').del()
        .where({ official: true });
    await knex('genesys_ability').del()
        .where({ official: true });

    // Inserts seed entries
    await Promise.all(eoteAbilities.map((ability) => knex('eote_ability').insert(ability)));
    await Promise.all(genesysAbilities.map((ability) => knex('genesys_ability').insert(ability)));
};

//----------------------------------------------------------------------------------------------------------------------
