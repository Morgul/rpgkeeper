//----------------------------------------------------------------------------------------------------------------------
// Populate a default set of EotE Force Abilities
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function seed(knex : Knex) : Promise<void>
{
    // Inserts seed entries
    await knex('eote_forcepower').insert([
        {
            id: 1,
            name: 'Battle Meditation',
            description: 'The Force user directs allies in battle, making them more effective as a '
                    + 'coordinated unit.\n\nThe user may spend 3 <forcepoint></forcepoint> to add one automatic '
                    + '<success></success> to all checks made by a number of engaged friendly targets up to his '
                    + 'Presence before the end of his next turn. If the user used any <darkside></darkside> to '
                    + 'generate <forcepoint></forcepoint>, reduce each target’s Willpower by 1 (to a minimum of 1) '
                    + 'until the end of the encounter.',
            min_rating: 2,
            upgrades: JSON.stringify({
                strength: {
                    available: 1,
                    description: 'Spend <forcepoint></forcepoint><forcepoint></forcepoint> to add one additional '
                            + 'automatic <success></success> to affected character\'s checks.'
                },
                magnitude: {
                    available: 4,
                    description: 'Spend <forcepoint></forcepoint> to affect a number of additional targets equal '
                            + 'to Presence per rank of Magnitude purchased.'
                },
                duration: {
                    available: 1,
                    description: 'Commit <force></force><force></force><force></force> to sustain the ongoing '
                            + 'effects of the power on each affected target while it remains in range.'
                },
                range: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase the power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                control: [
                    {
                        description: 'When making a <b>Battle Meditation power check</b>, the user may '
                                + 'make an <b>Easy (<difficulty></difficulty>) Leadership check</b> as part of the '
                                + 'pool. If the user is able to activate the power and succeeds on the check, he may '
                                + 'send simple orders as part of the power.'
                    },
                    {
                        description: 'May suffer 4 strain to change the range of the power and range upgrades to '
                                + 'planetary scale.'
                    }
                ],
                mastery: {
                    available: 1,
                    description: 'If no <darkside></darkside> were used to generate <forcepoint></forcepoint>, '
                            + 'choose one skill. While affected by the power, each affected character counts as having '
                            + 'the same number of ranks in the chosen skill as the affected character with the most '
                            + 'ranks in the skill. If the user used any <darkside></darkside> to generate '
                            + '<forcepoint></forcepoint>, each affected character must make an '
                            + '<b>Easy (<difficulty></difficulty>) Discipline check</b> if he wishes to resist obeying '
                            + 'orders.'
                }
            }),
            reference: 'F-CRB:284',
            official: true,
            scope: 'public'
        },
        {
            id: 2,
            name: 'Bind',
            description: 'The Force user restrains an enemy, preventing the target from acting.\n\nThe user '
                    + 'may spend <forcepoint></forcepoint> to immobilize a target within short range until the '
                    + 'end of the user\'s next turn.',
            min_rating: 2,
            upgrades: JSON.stringify({
                strength: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint><forcepoint></forcepoint> to disorient the '
                            + 'target for a number of rounds equal to the Strength upgrades purchased.'
                },
                magnitude: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to affect 1 additional target within range '
                            + 'per rank of Magnitude purchased.'
                },
                duration: {
                    available: 1,
                    description: 'Commit <force></force><force></force><force></force> to sustain the ongoing '
                            + 'effects of the power on each affected target.'
                },
                range: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase the power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                control: [
                    {
                        description: 'Spend <forcepoint></forcepoint>; whenever a target affected by Bind takes '
                                + 'an action, that target suffers strain equal to Willpower.'
                    },
                    {
                        description: 'Spend <forcepoint></forcepoint> to move the target one range band closer '
                                + 'or farther away.'
                    }
                ],
                mastery: {
                    available: 1,
                    description: 'When the user is making a <b>Bind power check</b>, if the check was not '
                            + 'already opposed, the user may roll an opposed <b>Discipline vs. Discipline check</b> '
                            + 'against one target of the power. If no <darkside></darkside> were used to '
                            + 'generate <forcepoint></forcepoint> and the user succeeds on the check, he may '
                            + 'immediately stagger the target until the end of his next turn. If any '
                            + '<darkside></darkside> were used to generate <forcepoint></forcepoint> and the check '
                            + 'succeeds, the target suffers a Critical Injury, adding +10 to the roll per '
                            + '<forcepoint></forcepoint> spent on the check.'
                }
            }),
            reference: 'F-CRB:286',
            official: true,
            scope: 'public'
        },
        {
            id: 3,
            name: 'Enhance',
            description: 'When making an Athletics check, the Force user may roll an <b>Enhance power check</b> '
                    + 'as part of the pool.\n\nThe user may spend <forcepoint></forcepoint> to gain '
                    + '<success></success> or <advantage></advantage> (user\'s choice) on the check.',
            min_rating: 2,
            upgrades: JSON.stringify({
                range: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase the power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                control: [
                    {
                        description: 'Enhance can be used with the Coordination skill.'
                    },
                    {
                        description: 'Enhance can be used with the Piloting (Planetary) skill.'
                    },
                    {
                        description: 'Enhance can be used with the Piloting (Space) skill.'
                    },
                    {
                        description: 'Ongoing effect: Commit <force></force>. The user increases his Agility '
                                + 'characteristic by 1 (to a maximum of 6).'
                    },
                    {
                        description: 'Enhance can be used with the Resilience skill.'
                    },
                    {
                        description: 'Enhance can be used with the Brawl skill.'
                    },
                    {
                        description: 'Ongoing effect: Commit <force></force>. The user increases his Brawn '
                                + 'characteristic by 1 (to a maximum of 6).'
                    },
                    {
                        description: 'Take a Force Leap action: Make an <b>Enhance power check</b>. The user '
                                + 'may spend <forcepoint></forcepoint> to jump horizontally to any location in '
                                + 'short range.'
                    },
                    {
                        description: 'When performing a Force Leap, the user can jump vertically in addition to '
                                + 'jumping horizontally.'
                    },
                    {
                        description: 'The user can perform a Force Leap as a maneuver instead of an action.'
                    }
                ]
            }),
            reference: 'F-CRB:288',
            official: true,
            scope: 'public'
        },
        {
            id: 4,
            name: 'Foresee',
            description: 'The Force user can feel the Force flowing around everything, seeing what is and what '
                    + 'will be.\n\nThe user may spend <forcepoint></forcepoint> to gain vague hints of events to '
                    + 'come, up to a day into his own, personal future.',
            min_rating: 1,
            upgrades: JSON.stringify({
                strength: {
                    available: 2,
                    description: 'Spend <forcepoint></forcepoint> to pick out specific details equal to '
                            + 'Strength upgrades purchased.'
                },
                magnitude: {
                    available: 2,
                    description: 'Spend <forcepoint></forcepoint> to increase targets affected equal to '
                            + 'Magnitude upgrades purchased.'
                },
                duration: {
                    available: 2,
                    description: 'Spend <forcepoint></forcepoint> to increase the days into the future the '
                            + 'user can see equal to Duration upgrades purchased.'
                },
                range: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                control: [
                    {
                        description: 'When making a skill check to determine Initiative, the user may roll a '
                                + '<b>Foresee power check</b> as part of the pool. He may spend '
                                + '<forcepoint></forcepoint> to gain <success></success> on the check.'
                    },
                    {
                        description: 'When performing a <b>Foresee power check</b> as part of an Initiative '
                                + 'check, the user may spend <forcepoint></forcepoint> to allow all affected targets '
                                + 'to take one free maneuver before the first round of combat begins.'
                    },
                    {
                        description: 'Affected targets increase their ranged and melee defense by 2 for the '
                                + 'first round of combat.'
                    }
                ]
            }),
            reference: 'F-CRB:290',
            official: true,
            scope: 'public'
        },
        {
            id: 5,
            name: 'Heal/Harm',
            description: 'The Force user bolsters his ally with renewed vigor or saps his foe of vital '
                    + 'energy.\n\n<b>Heal (light side Force user only):</b> Spend <forcepoint></forcepoint> to heal '
                    + 'a number of wounds equal to Intellect from an engaged living creature (including user).\n\n'
                    + '<b>Harm:</b> Spend <forcepoint></forcepoint> to inflict a number of wounds equal to '
                    + 'Intellect (ignoring soak) on an engaged living target. The user gains 1 Conflict.',
            min_rating: 1,
            upgrades: JSON.stringify({
                strength: {
                    available: 2,
                    description: '<b>Heal:</b> Spend <forcepoint></forcepoint> to increase wounds healed by '
                            + '1 per rank of Strength upgrades purchased.\n\n<b>Harm:</b> Spend '
                            + '<forcepoint></forcepoint> to increase wounds inflicted by 1 per rank of Strength '
                            + 'upgrades purchased.'
                },
                magnitude: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint><forcepoint></forcepoint> to affect 1 '
                            + 'additional target within the range per rank of Magnitude purchased.'
                },
                range: {
                    available: 2,
                    description: 'Spend <forcepoint></forcepoint> to increase power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                mastery: {
                    available: 1,
                    description: '<b>Heal:</b> Once per session, spend '
                            + '<forcepoint></forcepoint><forcepoint></forcepoint><forcepoint></forcepoint>'
                            + '<forcepoint></forcepoint> to restore 1 target who died after end of user\'s last '
                            + 'turn to life.\n\n<b>Harm:</b> Once per session, when this power kills a target, may '
                            + 'restore one engaged character who died this encounter to life. Each character gains '
                            + '7 Conflict.'
                },
                control: [
                    {
                        description: '<b>Heal:</b> If no <darkside></darkside> generated '
                                + '<forcepoint></forcepoint>, target heals strain equal to wounds healed.\n\n'
                                + '<b>Harm:</b> If any <darkside></darkside> were used to generate '
                                + '<forcepoint></forcepoint>, user heals strain equal to wounds inflicted.'
                    },
                    {
                        description: '<b>Heal:</b> Spend <forcepoint></forcepoint> to remove one status '
                                + 'effect from target.\n\n<b>Harm:</b> The user may spend <forcepoint></forcepoint> '
                                + 'to heal wounds equal to wounds inflicted on target. Healed Character gains 1 '
                                + 'Conflict.'
                    },
                    {
                        description: '<b>Heal:</b> May make a <b>Heal power check</b> combined with a '
                                + '<b>Hard (<difficulty></difficulty><difficulty></difficulty>'
                                + '<difficulty></difficulty>) Medicine check</b>. If check succeeds, one target who '
                                + 'heals wounds also heals one Critical Injury.\n\n<b>Harm:</b> May make a <b>Harm '
                                + 'power check</b> combined with an <b>opposed Medicine vs. Resilience check</b>. '
                                + 'If check succeeds, one target who suffers wounds also suffers one Critical '
                                + 'Injury (adding +10 to the roll per <advantage></advantage>'
                                + '<advantage></advantage>).'
                    }
                ]
            }),
            reference: 'F-CRB:292',
            official: true,
            scope: 'public'
        },
        {
            id: 6,
            name: 'Influence',
            description: 'The character may attempt to guide, shape, and even twist the thoughts and '
                    + 'feelings of others.\n\n<b>Special rule(<lightside></lightside>/<darkside></darkside> '
                    + 'use):</b> When guiding and shaping thoughts, only <forcepoint></forcepoint> generated from '
                    + '<darkside></darkside> may be used to generate negative emotions such as rage, fear, an '
                    + 'hatred. Only <forcepoint></forcepoint> generated from <lightside></lightside> may be used '
                    + 'to generate positive emotions such as peace, tranquility, and friendliness. Other emotions '
                    + 'such as confusion can be created from <forcepoint></forcepoint> generated from either '
                    + '<lightside></lightside> or <darkside></darkside>.\n\nCharacter may spend '
                    + '<forcepoint></forcepoint> to stress the mind of on living target he is engaged with, '
                    + 'inflicting 1 strain.',
            min_rating: 1,
            upgrades: JSON.stringify({
                strength: {
                    available: 1,
                    description: 'When stressing the mind of a target, the character inflicts 2 strain.'
                },
                magnitude: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase targets affected equal to '
                            + 'Magnitude upgrades purchased.'
                },
                duration: {
                    available: 4,
                    description: 'Spend <forcepoint></forcepoint> to increase duration by number of rounds '
                            + '(or minutes) equal to Duration upgrades purchased.'
                },
                range: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                control: [
                    {
                        description: 'The Force uder may make an <b>opposed Discipline vs. Discipline '
                                + 'check</b> combined with an <b>Influence power check</b>. If the user spends '
                                + '<forcepoint></forcepoint> and succeeds on the check, he can force the target to '
                                + 'adopt an emotional state or believe something untrue, lasting for 1 round or '
                                + '5 minutes.'
                    },
                    {
                        description: 'When making a Coercion, Charm, Deception, Leadership, or Negotiation '
                                + 'check, the Force user may roll an <b>Influence power check</b> as part of his '
                                + 'dice pool. He may spend <forcepoint></forcepoint> to gain <success></success> '
                                + 'or <advantage></advantage> (user\'s choice) on the check.'
                    }
                ]
            }),
            reference: 'F-CRB:294',
            official: true,
            scope: 'public'
        },
        {
            id: 7,
            name: 'Misdirect',
            description: 'The Force user creates illusions to fool those around him.\n\nThe user may spend '
                    + '<forcepoint></forcepoint> to make a target at up to short range unable to perceive a chosen '
                    + 'person or object of silhouette 1 or smaller. Until the beginning of the user\'s next turn, '
                    + 'the target cannot see or sense the hidden person or object.',
            min_rating: 1,
            upgrades: JSON.stringify({
                strength: {
                    available: 4,
                    description: 'Spend <forcepoint></forcepoint><forcepoint></forcepoint> to increase the '
                            + 'silhouette of the object obscured or illusion created by 1 per Strength upgrade '
                            + 'purchased.'
                },
                magnitude: {
                    available: 2,
                    description: 'Spend <forcepoint></forcepoint> to affect additional targets equal to '
                            + 'Presence per rank of Magnitude purchased.'
                },
                duration: {
                    available: 1,
                    description: 'Commit <force></force><force></force> to sustain this power while the '
                            + 'beguiled target remains in range.'
                },
                range: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                mastery: {
                    available: 1,
                    description: 'Spend <forcepoint></forcepoint><forcepoint></forcepoint> to obscure '
                            + 'additional objects or create illusions equal to Cunning plus Deception.'
                },
                control: [
                    {
                        description: 'May use this power to force the target to perceive a single illusory '
                                + 'person or object.'
                    },
                    {
                        description: 'Commit one or more <force></force>. Add <threat></threat> per '
                                + '<force></force> to all combat checks targeting the force user.'
                    }
                ]
            }),
            reference: 'F-CRB:296',
            official: true,
            scope: 'public'
        },
        {
            id: 8,
            name: 'Move',
            description: 'The Force user can move small objects via the power of the Force.\n\nThe user may '
                    + 'spend <forcepoint></forcepoint> to move one object of silhouette 0 that is within short '
                    + 'range up to this maximum range. The default maximum range is short range.',
            min_rating: 1,
            upgrades: JSON.stringify({
                strength: {
                    available: 4,
                    description: 'Spend <forcepoint></forcepoint> to increase silhouette able to be targeted '
                            + 'equal to Strength upgrades purchased.'
                },
                magnitude: {
                    available: 4,
                    description: 'Spend <forcepoint></forcepoint> to increase targets affected equal to '
                            + 'Magnitude upgrades purchased.'
                },
                range: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                control: [
                    {
                        description: 'The Force user can hurl objects to damage targets, by making a '
                                + '<b>ranged combat check</b> combined with a <b>Move power check</b>, dealing '
                                + 'damage equal to 10 times silhouette.'
                    },
                    {
                        description: 'The Force user can pull objects out of secure mountings or out of an '
                                + 'opponent\'s grasp.'
                    },
                    {
                        description: 'The character can perform fine manipulation of items, allowing him to '
                                + 'do whatever he could normally do with his hands via this power at this power\'s '
                                + 'range.'
                    }
                ]
            }),
            reference: 'F-CRB:298',
            official: true,
            scope: 'public'
        },
        {
            id: 9,
            name: 'Protect/Unleash',
            description: 'The Force user guides the flow of energy, protecting himself and others or '
                    + 'unleashing blasts of power upon his foes.\n\n<b>Protect:</b> The usr makes a <b>Protect '
                    + 'power check</b> and rolls an <b>Average (<difficulty></difficulty><difficulty></difficulty>) '
                    + 'Discipline check</b> as part of the pool. Spend <forcepoint></forcepoint>'
                    + '<forcepoint></forcepoint> to reduce damage from an energy-based weapon that hits himself or '
                    + 'an engaged character by amount equal to Willpower plus one per <success></success>. Dark '
                    + 'Side Force users may only protect themselves.\n\n<b>Unleash:</b> The user makes an '
                    + '<b>Unleash power check</b> as ranged attack and rolls an <b>Average ('
                    + '<difficulty></difficulty><difficulty></difficulty>) Discipline check</b> for difficulty. If '
                    + 'check succeeds and spends <forcepoint></forcepoint><forcepoint></forcepoint>, the attack '
                    + 'hits. It has a range of short, a base damage equal to Willpower, and a critical rating of '
                    + '4. The user gains 1 Conflict.',
            min_rating: 3,
            upgrades: JSON.stringify({
                strength: {
                    available: 4,
                    description: 'Spend <forcepoint></forcepoint> to decrease damage or add damage equal to '
                            + 'ranks of Strength purchased.'
                },
                magnitude: {
                    available: 2,
                    description: 'Spend <forcepoint></forcepoint> to affect 1 additional target within range '
                            + 'per rank of Magnitude purchased.'
                },
                duration: {
                    available: 1,
                    description: '<b>Protect:</b> If not <darkside></darkside> generated '
                            + '<forcepoint></forcepoint> that power reduces damage of all attacks hitting the '
                            + 'target.\n\n<b>Unleash:</b> Spend <forcepoint></forcepoint> to give the attack '
                            + 'Burn 2.'
                },
                range: {
                    available: 2,
                    description: 'Spend <forcepoint></forcepoint><forcepoint></forcepoint> to increase '
                            + 'power\'s range by a number of range bands equal to Range upgrades purchased.'
                },
                mastery: {
                    available: 1,
                    description: '<b>Protect:</b> Light side Force users may spend <forcepoint></forcepoint>'
                            + '<forcepoint></forcepoint> to reflect all attacks they reduce to 0 damage, deal '
                            + 'damage equal to the initial attack to attacker.\n\n<b>Unleash:</b> Dark side Force '
                            + 'users may spend <forcepoint></forcepoint> to reduce critical rating of attacks to 1.'
                },
                control: [
                    {
                        description: '<b>Protect:</b> Spend <advantage></advantage> to gain defense equal '
                                + 'to <advantage></advantage> spent.\n\n<b>Unleash:</b> Spend '
                                + '<advantage></advantage> to inflict 1 strain on target.'
                    },
                    {
                        description: '<b>Protect:</b> Spend <forcepoint></forcepoint> to allow power to '
                                + 'protect against all types of attack.\n\n<b>Unleash:</b> Spend '
                                + '<forcepoint></forcepoint> to give the attack Ensnare 2.'
                    },
                    {
                        description: '<b>Protect:</b> Light side Force users may spend 1 Destiny Point to '
                                + 'use Protect as an out-of-turn incidental once per session.\n\n<b>Unleash:</b> '
                                + 'Dark side Force users may spend 1 Destiny Point to use Unleash as a maneuver '
                                + 'once per session.'
                    }
                ]
            }),
            reference: 'F-CRB:300',
            official: true,
            scope: 'public'
        },
        {
            id: 10,
            name: 'Seek',
            description: 'The Force user allows the will of the Force to lead the way to something lost or '
                    + 'forgotten.\n\nThe user map spend <forcepoint></forcepoint><forcepoint></forcepoint> to gain '
                    + 'insight into the general location or direction of a person or object that he knows about, '
                    + 'regardless of current distance.\n\nThe user may spend <forcepoint></forcepoint> and '
                    + 'succeed at an <b>Average (<difficulty></difficulty><difficulty></difficulty>) Vigilance '
                    + 'check</b> (or <b>opposed Vigilance vs. Discipline check</b>) to see through illusions.',
            min_rating: 1,
            upgrades: JSON.stringify({
                strength: {
                    available: 2,
                    description: 'Spend <forcepoint></forcepoint> to eliminate 1 Force-based illusion per '
                            + 'Strength upgrade purchased.'
                },
                magnitude: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to gain one additional detail per Magnitude '
                            + 'upgrade purchased.'
                },
                duration: {
                    available: 1,
                    description: 'Commit <force></force> to continue tracking target even when it moves.'
                },
                mastery: {
                    available: 1,
                    description: 'Make <b>Seek power check</b> and spend <forcepoint></forcepoint>'
                            + '<forcepoint></forcepoint><forcepoint></forcepoint> to add <triumph></triumph> to '
                            + 'combat checks against one target for remainder of encounter.'
                },
                control: [
                    {
                        description: 'Ongoing effect: Commit <force></force>. Upgrade the ability of your '
                                + 'Vigilance and Perception checks once.'
                    },
                    {
                        description: 'Spend <forcepoint></forcepoint> to track one additional target.'
                    },
                    {
                        description: 'Ongoing effect: Commit <force></force><force></force><force></force>. '
                                + 'The user\'s attacks gain Pierce with rating equal to Cunning plus ranks in '
                                + 'Perception.'
                    }
                ]
            }),
            reference: 'F-CRB:302',
            official: true,
            scope: 'public'
        },
        {
            id: 11,
            name: 'Sense',
            description: 'The Force user can sense the Force interacting with the world around him.\n\nThe '
                    + 'user may spend <forcepoint></forcepoint> to sense all living things within short range '
                    + '(including sentient and non-sentient beings.)\n\nThe user may spend '
                    + '<forcepoint></forcepoint> to sense the current emotional state of one living target with '
                    + 'whom he is engaged.',
            min_rating: 1,
            upgrades: JSON.stringify({
                strength: {
                    available: 1,
                    description: 'When using Sense\'s ongoing effects, upgrading the pool twice, instead of '
                            + 'once.'
                },
                magnitude: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase number of targets affected by '
                            + 'power equal to Magnitude upgrades purchased.'
                },
                duration: {
                    available: 1,
                    description: 'Sense\'s ongoing effects make be triggered one additional time per round.'
                },
                range: {
                    available: 3,
                    description: 'Spend <forcepoint></forcepoint> to increase power\'s range by a number of '
                            + 'range bands equal to Range upgrades purchased.'
                },
                control: [
                    {
                        description: 'Ongoing effect: Commit <force></force>. Once per round, when an attack '
                                + 'targets the Force user, he upgrades the difficulty of the pool once.'
                    },
                    {
                        description: 'Ongoing effect: Commit <force></force>. Once per round, when the Force '
                                + 'user makes a combat check, he upgrades the ability of that check once.'
                    },
                    {
                        description: 'Effect: Spend <forcepoint></forcepoint>. The Force user senses the '
                                + 'current thoughts of one living target with whom he is engaged.'
                    }
                ]
            }),
            reference: 'F-CRB:304',
            official: true,
            scope: 'public'
        }
    ])
        .onConflict('id')
        .merge();
}

//----------------------------------------------------------------------------------------------------------------------
