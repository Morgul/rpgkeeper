//----------------------------------------------------------------------------------------------------------------------
// EotEDice
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';

// Interfaces
import { EoteCritical } from '../../../../common/interfaces/systems/eote';

//----------------------------------------------------------------------------------------------------------------------

export const eoteChoices = {
    ability: [
        undefined,
        'success',
        'success',
        [ 'success', 'success' ],
        'advantage',
        'advantage',
        [ 'success', 'advantage' ],
        [ 'advantage', 'advantage' ]
    ],
    proficiency: [
        undefined,
        'success',
        'success',
        [ 'success', 'success' ],
        [ 'success', 'success' ],
        'advantage',
        [ 'success', 'advantage' ],
        [ 'success', 'advantage' ],
        [ 'success', 'advantage' ],
        [ 'advantage', 'advantage' ],
        [ 'advantage', 'advantage' ],

        // We add 'success' to the results, since a triumph is both a success and a triumph, for roll resolution.
        [ 'triumph', 'success' ]
    ],
    difficulty: [
        undefined,
        'failure',
        [ 'failure', 'failure' ],
        'threat',
        'threat',
        'threat',
        [ 'threat', 'threat' ],
        [ 'failure', 'threat' ]
    ],
    challenge: [
        undefined,
        'failure',
        'failure',
        [ 'failure', 'failure' ],
        [ 'failure', 'failure' ],
        'threat',
        'threat',
        [ 'failure', 'threat' ],
        [ 'failure', 'threat' ],
        [ 'threat', 'threat' ],
        [ 'threat', 'threat' ],

        // We add 'failure' to the results, since a despair is both a failure and a despair, for roll resolution.
        [ 'despair', 'failure' ]
    ],
    boost: [
        undefined,
        undefined,
        'success',
        [ 'success', 'advantage' ],
        [ 'advantage', 'advantage' ],
        'advantage'
    ],
    setback: [
        undefined,
        undefined,
        'failure',
        'failure',
        'threat',
        'threat'
    ],
    force: [
        'darkside',
        'darkside',
        'darkside',
        'darkside',
        'darkside',
        'darkside',
        [ 'darkside', 'darkside' ],
        'lightside',
        'lightside',
        [ 'lightside', 'lightside' ],
        [ 'lightside', 'lightside' ],
        [ 'lightside', 'lightside' ]
    ]
};

export const eoteDiceSortOrder = [
    'force',
    'proficiency',
    'ability',
    'challenge',
    'difficulty',
    'boost',
    'setback'
];

export const eoteResultsSortOrder = [
    'advantage',
    'threat',
    'success',
    'failure',
    'triumph',
    'despair',
    'lightside',
    'darkside'
];

export const criticals : EoteCritical[] = [
    {
        range: [ 1, 5 ],
        severity: 1,
        title: 'Minor Nick',
        description: 'The target suffers 1 strain.'
    },
    {
        range: [ 6, 10 ],
        severity: 1,
        title: 'Slowed Down',
        description: 'The target can only act during the last allied initiative slot on his next turn.'
    },
    {
        range: [ 11, 15 ],
        severity: 1,
        title: 'Sudden Jolt',
        description: 'The target drops whatever is in hand.'
    },
    {
        range: [ 16, 20 ],
        severity: 1,
        title: 'Distracted',
        description: 'The target cannot perform a free maneuver during his next turn.'
    },
    {
        range: [ 21, 25 ],
        severity: 1,
        title: 'Off-Balance',
        description: 'Add <setback></setback> to his next skill check.'
    },
    {
        range: [ 26, 30 ],
        severity: 1,
        title: 'Discouraging Wound',
        description: 'Flip one light side Destiny point to a dark side Destiny Point (reverse if NPC.)'
    },
    {
        range: [ 31, 35 ],
        severity: 1,
        title: 'Stunned',
        description: 'The target is staggered until the end of his next turn.'
    },
    {
        range: [ 36, 40 ],
        severity: 1,
        title: 'Stinger',
        description: 'Increase difficulty of next check by one.'
    },
    {
        range: [ 41, 45 ],
        severity: 2,
        title: 'Bowled Over',
        description: 'The target is knocked prone and suffers 1 strain.'
    },
    {
        range: [ 46, 50 ],
        severity: 2,
        title: 'Head Ringer',
        description: 'The target increases the difficulty of all Intellect and Cunning check by one until the end of the encounter.'
    },
    {
        range: [ 51, 55 ],
        severity: 2,
        title: 'Fearsome Wound',
        description: 'The target increases the difficulty of all Presence and Willpower check by one until the end of the encounter.'
    },
    {
        range: [ 56, 60 ],
        severity: 2,
        title: 'Agonizing Wound',
        description: 'The target increases the difficulty of all Brawn and Agility checks by one until the end of the encounter.'
    },
    {
        range: [ 61, 65 ],
        severity: 2,
        title: 'Slightly Dazed',
        description: 'The target is disoriented until the end of the encounter.'
    },
    {
        range: [ 66, 70 ],
        severity: 2,
        title: 'Scattered Senses',
        description: 'Remove all <boost></boost> from skill checks until the end of the encounter.'
    },
    {
        range: [ 71, 75 ],
        severity: 2,
        title: 'Hamstrung',
        description: 'The target loses his free maneuver until the end of the encounter.'
    },
    {
        range: [ 76, 80 ],
        severity: 2,
        title: 'Overpowered',
        description: 'The target leaves himself open, and the attacker may immediately attempt another free attack against him, using the exact same pool as the original attack.'
    },
    {
        range: [ 81, 85 ],
        severity: 2,
        title: 'Winded',
        description: 'Until the end of the encounter, the target cannot voluntarily suffer strain to activate any abilities or gain additional maneuvers.'
    },
    {
        range: [ 86, 90 ],
        severity: 2,
        title: 'Compromised',
        description: 'Increase difficulty of all skill check by one until the end of the encounter.'
    },
    {
        range: [ 91, 95 ],
        severity: 3,
        title: 'At the Brink',
        description: 'The target suffers 1 strain each time he performs an action.'
    },
    {
        range: [ 96, 100 ],
        severity: 3,
        title: 'Crippled',
        description: "One of the target's limbs (selected by the GM) is crippled until healed or replaced. Increase difficulty of all checks that require use of that limb by one."
    },
    {
        range: [ 101, 105 ],
        severity: 3,
        title: 'Maimed',
        description: 'A limb is permanently lost. Unless the target has a cybernetic replacement, the target cannot perform actions that would require the use of that limb. All other actions gain <setback></setback>.'
    },
    {
        range: [ 106, 110 ],
        severity: 3,
        title: 'Horrific Injury',
        description: "Randomly roll 1d10 to determine one of the target's characteristics&#8212; 1-3 for Brawn, 4-6 for Agility, 7 for Intellect, 8 for Cunning, 9 for Presence, 10 for Willpower. Until this Critical Inquiry is repaired, treat that characteristic as one point lower."
    },
    {
        range: [ 111, 115 ],
        severity: 3,
        title: 'Temporarily Lame',
        description: 'Until this Critical Injury is healed, the target cannot perform more than one maneuver during his turn.'
    },
    {
        range: [ 116, 120 ],
        severity: 3,
        title: 'Blinded',
        description: 'The target can no longer see Upgrade the difficulty of all checks twice. Upgrade the difficulty of Perception and Vigilance checks three times.'
    },
    {
        range: [ 121, 125 ],
        severity: 3,
        title: 'Knocked Senseless',
        description: 'The target is staggered for the remainder of the encounter.'
    },
    {
        range: [ 126, 130 ],
        severity: 4,
        title: 'Gruesome Injury',
        description: "Randomly roll 1d10 for one of the target's characteristics&#8212; 1-3 for Brawn, 4-6 for Agility, 7 for Intellect, 8 for Cunning, 9 for Presence, 10 for Willpower. That characteristic is permanently reduced by one, to a minimum of one."
    },
    {
        range: [ 131, 140 ],
        severity: 4,
        title: 'Bleeding Out',
        description: 'Every round, the target suffers 1 wound and 1 strain at the beginning of his turn. For every five wounds he suffers beyond his wound threshold, he suffers one additional Critical Injury. Roll on the chart, suffering the injury (if he suffers this result a second time due to this, roll again).'
    },
    {
        range: [ 141, 150 ],
        severity: 4,
        title: 'The End is Nigh',
        description: 'The target will die after the last Initiative slot during the next round.'
    },
    {
        range: [ 151, Infinity ],
        severity: undefined,
        title: 'Dead',
        description: 'Complete, obliterated death.'
    }
]; // end criticals

//----------------------------------------------------------------------------------------------------------------------

/**
 * Takes the results of an Edge of the Empire style dice roll, and cancels the results correctly.
 *
 * @param results - The results of the dice roll.
 *
 * @returns The uncancelled results.
 */
export function cancelEotEResults(results : string[]) : string[]
{
    const uncancelled : string[] = [];
    const counts = _.countBy(results);

    // Default the count results
    counts.success = counts.success || 0;
    counts.failure = counts.failure || 0;
    counts.advantage = counts.advantage || 0;
    counts.threat = counts.threat || 0;
    counts.triumph = counts.triumph || 0;
    counts.despair = counts.despair || 0;
    counts.lightside = counts.lightside || 0;
    counts.darkside = counts.darkside || 0;

    // Cancel success/failures
    if(counts.success > counts.failure)
    {
        _.each(_.range(counts.success - counts.failure), () => { uncancelled.push('success'); });
    }
    else
    {
        _.each(_.range(counts.failure - counts.success), () => { uncancelled.push('failure'); });
    } // end if

    // Cancel advantage/threat
    if(counts.advantage > counts.threat)
    {
        _.each(_.range(counts.advantage - counts.threat), () => { uncancelled.push('advantage'); });
    }
    else
    {
        _.each(_.range(counts.threat - counts.advantage), () => { uncancelled.push('threat'); });
    } // end if

    // Add back in triumph
    _.each(_.range(counts.triumph), () => { uncancelled.push('triumph'); });

    // Add back in despair
    _.each(_.range(counts.despair), () => { uncancelled.push('despair'); });

    // Add back in light side
    _.each(_.range(counts.lightside), () => { uncancelled.push('lightside'); });

    // Add back in dark side
    _.each(_.range(counts.darkside), () => { uncancelled.push('darkside'); });

    return _.sortBy(uncancelled, (dieResult) => eoteResultsSortOrder.indexOf(dieResult));
} // end cancelResults

/**
 * Find the critical injury that is in the
 *
 * @param result - The result to find in the criticals list.
 *
 * @returns Returns the critical object whose range we're in.
 */
export function findCritical(result : number) : EoteCritical | undefined
{
    return criticals.find((critical) =>
    {
        if(result >= critical.range[0] && result <= critical.range[1])
        {
            return critical;
        } // end if
    });
} // end findCritical

//----------------------------------------------------------------------------------------------------------------------
