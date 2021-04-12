//----------------------------------------------------------------------------------------------------------------------
// Populate a default set of EotE/Genesys Talents
//----------------------------------------------------------------------------------------------------------------------

import { sortBy } from '../../utils/misc';

//----------------------------------------------------------------------------------------------------------------------

const genesysRefs = {
    'Durable': { tier: 1, reference: 'G-CRB:73' },
    'Enduring': { tier: 4, reference: 'G-CRB:80' },
    'Toughened': { tier: 1, reference: 'G-CRB:75' },
    'Parry': { tier: 1, reference: 'G-CRB:74' },
    'Rapid Reaction': { tier: 1, reference: 'G-CRB:74' },
    'Grit': { tier: 1, reference: 'G-CRB:73' },
    'Forager': { tier: 1, reference: 'G-CRB:73' },
    'Quick Strike': { tier: 1, reference: 'G-CRB:74' },
    'Dodge': { tier: 3, reference: 'G-CRB:78' },
    'Defensive Driving': { tier: 4, reference: 'G-CRB:80' },
    'Dedication': { tier: 5, reference: 'G-CRB:80' },
    'Jump Up': { tier: 1, reference: 'G-CRB:73' },
    'Second Wind': { tier: 1, reference: 'G-CRB:74' },
    'Parry (Improved)': { tier: 3, reference: 'G-CRB:79' },
    'Quick Draw': { tier: 1, reference: 'G-CRB:74' },
    'Side step': { tier: 2, reference: 'G-CRB:77' },
    'Defensive Stance': { tier: 2, reference: 'G-CRB:75' },
    'Heightened Awareness': { tier: 2, reference: 'G-CRB:76' }
};

exports.seed = async function(knex)
{
    const talents = [
        {
            id: -1,
            name: 'Durable',
            description: 'The character may reduce a Critical Injury result he suffers by 10 per rank of Durable, to a minimum of one.',
            activation: 'p',
            ranked: true,
            trees: 'Bodyguard, Fringer',
            reference: 'E-CRB:135',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Enduring',
            description: 'Character gains +1 soak value per rank of Enduring.',
            activation: 'p',
            ranked: true,
            trees: 'Bodyguard, Marauder, Mechanic, Survivalist',
            reference: 'E-CRB:135',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Toughened',
            description: 'The character increases his wound threshold by two per rank of Toughened.',
            activation: 'p',
            ranked: true,
            trees: 'Bodyguard, Fringer, Gadgeteer, Marauder, Mechanic, Outlaw Tech, Pilot Politico, Scholar, Scoundrel, Scout, Mercenary Soldier, Survivalist, Trader',
            reference: 'E-CRB:145',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Parry',
            description: 'When the character suffers a hit from a Brawl, Melee, or Lightsaber combat check, after damage is calculated (but before soak is applied, so immediately after step 3 of *Perform a Combat Check*, page 148 F&D), the character may take a Parry incidental. He suffers 3 strain and reduces the damage dealt by that hit from the attack by a number equal to two plus his ranks in Parry. This talent may only be used when the character is wielding a Lightsaber or Melee weapon.',
            activation: 'ai',
            ranked: true,
            trees: 'Ataru Striker, Makashi Duelist Niman Disciple, Protector, Shien Expert, Shii-Cho Knight, Soresu Defender',
            reference: 'F-CRB:149',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Rapid Reaction',
            description: 'The character may suffer a number of strain to add an equal number of <success></success> to any Vigilance or Cool check to determine Initiative order. The number may not exceed his ranks in Rapid Reaction.',
            activation: 'p',
            ranked: true,
            trees: 'Scoundrel, Thief',
            reference: 'E-CRB:141',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Grit',
            description: "Each rank of Grit increases a character's strain threshold by one.",
            activation: 'p',
            ranked: true,
            trees: 'Assassin Bodyguard, Doctor, Fringer, Mechanic, Outlaw Tech, Pilot, Politico, Scout, Slicer, Mercenary Soldier, Scholar, Survivalist, Thief, Trader',
            reference: 'E-CRB:136',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Forager',
            description: 'The character removes up to <setback></setback><setback></setback> from his skill checks to find food, water, or shelter. Survival checks to forage take half the time.',
            activation: 'p',
            ranked: false,
            trees: 'Force Sensitive Exile, Scout, Survivalist',
            reference: 'E-CRB:135',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Quick Strike',
            description: 'The character adds <boost></boost> per rank of Quick Strike to his combat checks made against any target that has not yet acted in the encounter.',
            activation: 'p',
            ranked: true,
            trees: 'Assassin, Scoundrel, Scout',
            reference: 'E-CRB:141',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Dodge',
            description: 'When targeted by a combat check (ranged or melee) the character may choose to immediately perform a Dodge incidental to suffer a number of strain, then upgrade the difficulty of the combat check by that number. The number of strain suffered cannot exceed his ranks in Dodge.',
            activation: 'ai',
            ranked: true,
            trees: 'Assassin, Doctor, Fringer, Politico, Thief, ',
            reference: 'E-CRB:135',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Defensive Driving',
            description: 'Increase defense of vehicle or starship being piloted by <difficulty></difficulty> per rank.',
            activation: 'p',
            ranked: true,
            trees: 'Squadron Leader',
            reference: 'E-CRB:134',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Dedication',
            description: "Each rank permanently increases a single characteristic of the player's choice by one point. This cannot bring a characteristic above 6.",
            activation: 'p',
            ranked: true,
            trees: 'Assassin, Bodyguard, Doctor, Force Sensitive Exile, Fringer, Gadgeteer, Marauder, Mechanic, Outlaw Tech, Pilot, Politico, Scholar, Scoundrel, Scout, Slicer, Mercenary Soldier, Survivalist, Thief, Trader',
            reference: 'E-CRB:134',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Jump Up',
            description: "Once per round on the character's turn, the character may stand up from prone or a seated position as an incidental.",
            activation: 'ai',
            ranked: false,
            trees: 'Assassin, Fringer, Thief',
            reference: 'E-CRB:138',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Second Wind',
            description: 'Once per encounter the character may use a Second Wind incidental to recover an amount of strain equal to his ranks in Second Wind.',
            activation: 'ai',
            ranked: false,
            trees: 'Peacekeeper, Shii-Cho Knight',
            reference: 'E-CRB:142',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Parry (Improved)',
            description: "Then the character suffers a hit from a **Brawl**, **Melee** or **Lightsaber** combat check and uses the Parry incidental to reduce the damage from that hit, after the attack is resolved, the character may spend <despair></despair> or <threat></threat><threat></threat><threat></threat> to automatically hit the attacker once with a wielded Brawl, Melee, or Lightsaber weapon. This his deals the weapon's base damage plus any damage from applicable talents or abilities. This talent may not be used if the original attack incapacitates the character.",
            activation: 'ai',
            ranked: false,
            trees: 'Ataru Striker, Makashi Duelist, Shii-Cho Knight, Soresu Defender',
            reference: 'F-CRB:149',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Quick Draw',
            description: "Once per round on the character's turn, he may draw or holster an easily accessible weapon as an incidental. This talent also reduces the amount of time to draw or stow a weapon that usually requires more than one maneuver to properly prepare or stow, by one maneuver.",
            activation: 'ai',
            ranked: false,
            trees: 'Assassin, Force Sensitive Exile, Scoundrel',
            reference: 'E-CRB:141',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Side step',
            description: "Once per round on the character's turn, the character may perform a Side Step maneuver to try to avoid incoming ranged attacks. He then suffers a number of strain no greater than his ranks in Side Step. Until the start of the character's turn, upgrade the difficulty of all ranged combat checks targeting the character a number of times equal to the strain suffered by the character.",
            activation: 'am',
            ranked: true,
            trees: 'Hunter, Shien Expert',
            reference: 'E-CRB:142',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Defensive Stance',
            description: 'Once per round, your character may suffer a number of strain no greater than their ranks in Defensive Stance to use this talent. Then, until the end of your character’s next turn, upgrade the difficulty of all melee combat checks targeting your character a number of times equal to the strain suffered.',
            activation: 'am',
            ranked: true,
            trees: 'Bodyguard, Gadgeteer, Marauder, Outlaw Tech',
            reference: 'E-CRB:134',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Heightened Awareness',
            description: 'Allies within short range of your character add <boost></boost> to their Perception and Vigilance checks. Allies engaged with your character add <boost></boost> <boost></boost> instead.',
            activation: 'p',
            ranked: false,
            trees: 'Scout',
            reference: 'E-CRB:136',
            official: true,
            scope: 'public'
        }
    ];

    const eoteTalents = talents.concat([
        {
            id: -1,
            name: 'Adversary',
            description: 'Upgrade the difficulty of any combat check targeting this character once per rank of Adversary.',
            activation: 'p',
            ranked: true,
            trees: 'NPC only',
            reference: 'E-CRB:132',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Anatomy Lessons',
            description: 'After a successful attack with a non-starship/vehicle weapon, the character may spend one Destiny Point to add damage equal to his Intellect to one hit of the attack.',
            activation: 'ai',
            ranked: false,
            trees: 'Assassin, Doctor',
            reference: 'E-CRB:132',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Armor Master',
            description: 'When wearing armor, the character increases his total soak value by one.',
            activation: 'p',
            ranked: false,
            trees: 'Gadgeteer',
            reference: 'E-CRB:132',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Armor Master (Improved)',
            description: 'When wearing armor with a soak value of two or higher, the character increases his defense by one.',
            activation: 'p',
            ranked: false,
            trees: 'Gadgeteer',
            reference: 'E-CRB:132',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Bacta Specialist',
            description: "Patients under the character's supervision regain one additional wound per rank of Bacta Specialist each time they recover a wound while recovering in a Bacta tank or under supervised medical conditions or long-term care.",
            activation: 'p',
            ranked: true,
            trees: 'Doctor',
            reference: 'E-CRB:132',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Deadly Accuracy',
            description: 'Each time the character gains a rank of Deadly Accuracy, he must choose one combat skill. The character may add his basic training ranks in that combat skill as additional damage to one hit of a successful attack made with that skill with non starship/vehicle weapons. He cannot choose the same combat skill twice.',
            activation: 'p',
            ranked: true,
            trees: 'Assassin, Gadgeteer, Mercenary Soldier',
            reference: 'E-CRB:134',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Disorient',
            description: "After hitting with a combat check, the character may spend <advantage></advantage><advantage></advantage> to disorient his foe (see page 230). Disoriented targets add <setback></setback> to all skill checks. The target is disoriented for a number of rounds equal to the attacker's ranks in Disorient.",
            activation: 'p',
            ranked: true,
            trees: 'Gadgeteer, Scout',
            reference: 'E-CRB:135',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Lethal Blows',
            description: 'The character adds +10 per rank of Lethal Blows to any Critical Injury rolls inflicted on opponents.',
            activation: 'p',
            ranked: true,
            trees: 'Assassin, Marauder, Mercenary Soldier',
            reference: 'E-CRB:138',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Natural Negotiator',
            description: 'Once per game session the character may reroll any one Cool or Negotiation check.',
            activation: 'ai',
            ranked: false,
            trees: 'Trader',
            reference: 'E-CRB:139',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Spare Clip',
            description: 'The character does not run out of ammo on a <despair></despair>. Items with the Limited Ammo quality run out of ammo as normal.',
            activation: 'p',
            ranked: false,
            trees: 'Gadgeteer, Trader',
            reference: 'E-CRB:143',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Convincing Demeanor',
            description: 'Remove <setback></setback> per rank of Convincing Demeanor from any Deception or Skulduggery check.',
            activation: 'p',
            ranked: true,
            trees: 'Force Sensitive Exile, Scoundrel, Trader',
            reference: 'E-CRB:133',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: "Nobody's Fool",
            description: "The difficulty of any Charm, Coercion, or Deception checks attempted against the character is upgraded once for each rank of Nobody's Fool.",
            activation: 'p',
            ranked: true,
            trees: 'Politico, Trader',
            reference: 'E-CRB:139',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Black Market Contacts',
            description: "When looking to purchase illegal, exotic, or black market goods, the character may decrease an item's rarity by one level per rank in Black Market Goods. For each level an item's rarity is decreased, it's cost increases by 50% of its base cost.",
            activation: 'ai',
            ranked: true,
            trees: 'Scoundrel, Thief, Trader',
            reference: 'E-CRB:132',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Bypass Security',
            description: "Remove <setback></setback> equal to the character's ranks in Bypass Security  from Skulduggery or Computers skills checks made to disable a security device, or open a locked door.",
            activation: 'p',
            ranked: true,
            trees: 'Slider, Trader',
            reference: 'E-CRB:133',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Codebreaker',
            description: 'The character removes <setback></setback> from any attempt to break codes, or decrypt communications equal to his ranks in Codebreaker. In addition, the character decreases the difficulty of Computer or Intellect checks made to break codes or decrypt communications by one. (_This does not increase with additional ranks of Codebreaker._)',
            activation: 'p',
            ranked: true,
            trees: 'Scholar, Slicer',
            reference: 'E-CRB:133',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Confidence',
            description: 'The character may decrease the difficulty of any **Discipline** check to avoid the effects of fear by one per rank of Confidence. If he decreases the difficulty to zero, he does not have to make a **Discipline** check.',
            activation: 'p',
            ranked: true,
            trees: 'Peacekeeper, Sage, Soresu Defender, Starfighter Ace',
            reference: 'E-CRB:133',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Defensive Slicing (Improved)',
            description: "When attempting to defend a computer system against intrusion, the character upgrades the difficulty of an opponent's dice pool a number of times equal to his ranks in Defensive Slicing. (_This replaces the usual benefit of Defensive Slicing._)",
            activation: 'p',
            ranked: true,
            trees: 'Slicer',
            reference: 'E-CRB:134',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Master Pilot',
            description: 'Oncer per round when piloting a starship (a ship piloted by using the Piloting (Space) skill), the character may voluntarily suffer two strain to perform any action as a maneuver instead.',
            activation: 'ai',
            ranked: false,
            trees: 'Pilot',
            reference: 'E-CRB:138',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Master Slicer',
            description: 'Oncer per round, the character may perform a Master Slicer incidental to suffer two strain and decrease the difficulty of the next Computers or other slicing-related check by one, to a minimum of **Easy (<difficulty></difficulty>)**',
            activation: 'ai',
            ranked: false,
            trees: 'Slicer',
            reference: 'E-CRB:139',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Natural Programmer',
            description: 'Oncer per game session, the character may reroll any one Computers or Astrogation check.',
            activation: 'ai',
            ranked: false,
            trees: 'Slicer',
            reference: 'E-CRB:139',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Researcher',
            description: 'The character removes <setback></setback> per rank of Researcher from all Knowledge checks. Researching takes 50% less time (_this does not increase with multiple ranks of researcher._).',
            activation: 'p',
            ranked: true,
            trees: 'Scholar',
            reference: 'E-CRB:141',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Wheel and Deal',
            description: 'When he sells goods to a reputable merchant or business, the character gains an additional 10% more credits per rank of Wheel and Deal (based on the original sell price of the good or item.)',
            activation: 'p',
            ranked: true,
            trees: 'Trader',
            reference: 'E-CRB:145',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Multiple Opponents',
            description: 'The character adds <boost></boost> to his Brawl, Melee and Lightsaber combat checks when engaged with multiple opponents. This includes single groups of multiple minions.',
            activation: 'p',
            ranked: false,
            trees: 'Shii-Cho Knight',
            reference: 'F-CRB:147',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Sarlacc Sweep',
            description: '_Force Talent._ The character may take the Sarlacc Sweep action, making a Lightsaber combat check with a +1 difficulty against one engaged target. The character may spend <advantage></advantage><advantage></advantage> generated by this combat check to hit one additional target he is engaged with. He may do this once per engaged target, paying <advantage></advantage><advantage></advantage> for each additional hit.\nWhen performing a combat check while benefiting from the Sarlacc Sweep incidental, the character must always target the opponent with the highest difficulty and highest defense (if this is two separate targets, the GM chooses which target is the initial target).',
            activation: 'aa',
            ranked: false,
            trees: 'Shii-Cho Knight',
            reference: 'F-CRB:151',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Force Rating',
            description: 'Gain a +1 Force Rating.',
            activation: 'p',
            ranked: true,
            trees: 'Force Sensitive Exile',
            reference: 'E-CRB:135',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Niman Technique',
            description: '_Force Talent._ When making a Lightsaber skill check, the character may use Willpower instead of Brawn.',
            activation: 'p',
            ranked: false,
            trees: 'Niman Disciple',
            reference: 'F-CRB:148',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Sum Djem',
            description: "_Force Talent._ When the character makes a Lightsaber combat check, he may spend <triumph></triumph> or <advantage></advantage><advantage></advantage> to disarm his opponent (with GM's approval). The disarmed weapon lands anywhere within short range of the engagement (character's choice).",
            activation: 'p',
            ranked: false,
            trees: 'Makashi Duelist, Niman Disciple, Shii-Cho Knight',
            reference: 'F-CRB:152',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Rapid Recovery',
            description: 'When this character heals strain after an encounter has concluded, he heals one additional strain per rank in Rapid Recovery.',
            activation: 'p',
            ranked: true,
            trees: 'Fringer, Pilot, Scout',
            reference: 'E-CRB:141',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Frenzied Attack',
            description: 'When making a Melee or Brawl combat check, the character may suffer a number of strain, then upgrade the ability of his combat check by that number. This number cannot exceed his ranks in Frenzied Attack.',
            activation: 'ai',
            ranked: false,
            trees: 'Marauder',
            reference: 'E-CRB:135',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Soft Spot',
            description: 'After making a successful attack with a non-starship/ vehicle weapon, the character may spend one Destiny Point to add damage equal to his Cunning to one hit of the successful attack.',
            activation: 'ai',
            ranked: false,
            trees: 'Scoundrel, Survivalist',
            reference: 'E-CRB:143',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Uncanny Reactions',
            description: 'Add <boost></boost> per rank of Uncanny Reaction to all Vigilance checks.',
            activation: 'p',
            ranked: true,
            trees: 'Seer',
            reference: 'E-CRB:145',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Keen Eyed',
            description: 'Remove <setback></setback> per rank of Keen Eyed from Perception and Vigilance checks. Decrease time to search a specific area by half.',
            activation: 'p',
            ranked: true,
            trees: 'Seer',
            reference: 'F-CRB:146',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Sense Danger',
            description: 'Once per game remove <setback></setback> <setback></setback> from any one check.',
            activation: 'ai',
            ranked: false,
            trees: 'Seer',
            reference: 'E-CRB:142',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Natural Hunter',
            description: 'Once per game session, the character may reroll any one Perception or Vigilance check.',
            activation: 'ai',
            ranked: false,
            trees: 'Scout',
            reference: 'E-CRB:139',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Reflect',
            description: '_Force talent_. When the character suffers a hit from a Ranged (Light), Ranged (Heavy), or Gunnery combat check, and after damage is calculated (but before soak is applied, so immediately after step 3 of **Perform a Combat Check**, page 148), if the character is wielding a lightsaber, he may take the Reflect incidental. He suffers 3 strain and reduces the damage dealt by that hit from the attack by a number equal to two plus his ranks in Reflect. This talent may only be used when the character is wielding a Lightsaber weapon.',
            activation: 'p',
            ranked: true,
            trees: 'Ataru Striker, Niman Disciple, Protector, Shien Expert, Soresu Defender',
            reference: 'F-CRB:150',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Situational Awareness',
            description: 'Allies within short range of the vehicle add <boost></boost> to their Perception and Vigilance checks. Allies within close range add <boost></boost><boost></boost> instead.',
            activation: 'p',
            ranked: false,
            trees: 'Squadron Leader',
            reference: 'A-CRB:156',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Tricky Target',
            description: 'Count vehicle or starship piloted as having a silhouette 1 lower when being attacked.',
            activation: 'p',
            ranked: false,
            trees: 'Squadron Leader',
            reference: 'E-CRB:145',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Precise Aim',
            description: "Once per round on the character's turn, the character may perform a Precise Aim maneuver before attempting a combat check and suffer a number of  strain. The number of strain cannot exceed his ranks in Precise Aim. He then decreases the target's defense (ranged and melee) by one per strain suffered for that combat check.",
            activation: 'am',
            ranked: true,
            trees: 'Assassin',
            reference: 'E-CRB:141',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Defensive Training',
            description: 'When wielding a lightsaber, melee weapon, or brawling weapon, the weapon gains Defensive X, where X equals ranks in Defensive Training.',
            activation: 'p',
            ranked: true,
            trees: 'Makashi Duelist, Niman Disciple, Shii-Cho Knight',
            reference: 'F-CRB:141',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Brilliant Evasion',
            description: 'Once per encounter may take Brilliant Evasion action. Select 1 opponent and make an *opposed Piloting (Space or Planetary)* check to stop opponent from attacking character for rounds equal to Agility.',
            activation: 'aa',
            ranked: false,
            trees: 'Squadron Leader',
            reference: 'E-CRB:132',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Stalker',
            description: 'The character adds <boost></boost> per rank of Stalker to all Coordination and Stealth checks.',
            activation: 'p',
            ranked: true,
            trees: 'Assassin, Scout, Survivalist, Thief',
            reference: 'E-CRB:143',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Targeted Blow',
            description: 'On a successful attack during combat with a non-starship/vehicle weapon, the character may spend on Destiny Point to add damage equal to his Agility to one hit of the successful attack.',
            activation: 'ai',
            ranked: false,
            trees: 'Assassin, Mercenary Soldier',
            reference: 'E-CRB:144',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Commanding Presence',
            description: 'The character removes <setback></setback> per rank of Commanding Presence form his **Leadership** and **Cool** checks.',
            activation: 'p',
            ranked: true,
            trees: 'Peacekeeper',
            reference: 'A-CRB:144',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Enhanced Leader',
            description: "_Force Talent_. When making a Leadership check, the character may add <force></force> no greater than Force rating to the check. The character may spend <force-point></force-point> to add <success></success> or <advantage></advantage> (character's choice) to the result.",
            activation: 'p',
            ranked: false,
            trees: 'Peacekeeper',
            reference: 'F-CRB:142',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Steely Nerves',
            description: 'The character may spend one Destiny Point to ignore the effects of ongoing Critical Injuries on any **Presence** or **Willpower**-related checks unto the end of the encounter. He still suffers from the injury itself.',
            activation: 'ai',
            ranked: false,
            trees: 'Advisor, Peacekeeper',
            reference: 'E-CRB:143',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Soresu Technique',
            description: '_Force Talent_. When making a **Lightsaber** skill check, the character may use Intellect instead of Brawn.',
            activation: 'p',
            ranked: false,
            trees: 'Soresu Defender',
            reference: 'F-CRB:152',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Parry (Supreme)',
            description: '_Force Talent_. If the user did not make a combat check during his previous turn, the suffers 1 strain when taking the Parry incidental, instead of 3.',
            activation: 'p',
            ranked: false,
            trees: 'Soresu Defender',
            reference: 'F-CRB:149',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Reflect (Improved)',
            description: "_Force Talent_. When the character suffers a hit from a a **Ranged (light)**, **Ranged (Heavy)**, or **Gunnery** combat check and used the Reflect incidental to reduce the damage from that hit, after the attack is resolved, the character may spend <despair></despair> or <threat></threat><threat></threat><threat></threat> to automatically hit one target within medium range, dealing the same damage as the hit from the initial ranged attack.\n\nThe ranged attack's hit must be one that is able to be reflected and redirected (generally only blaster weapons or other energy attacks fall into this category anything else is subject to GM oversight). This talent may not be used if the original attack incapacitates the character.",
            activation: 'aio',
            ranked: false,
            trees: 'Shien Expert, Soresu Defender',
            reference: 'F-CRB:150',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Feral Strength',
            description: 'When making a Melee Brawl combat check, the character may suffer a number of strain, then upgrade the ability of his combat check by that number. The number cannot exceed his ranks in Frenzied Attack.',
            activation: 'ai',
            ranked: true,
            trees: 'Marauder',
            reference: 'E-CRB:135',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Intimidating',
            description: 'When attempting a Coercion check, the character may suffer a number of strain to downgrade the difficulty of the check a number of times equal to the strain suffered. This number cannot exceed his ranks in Intimidating. When the character is the target of a Coercion check, the character may suffer a number of strain to upgrade the difficulty of the check a number of times equal to the strain suffered. This number cannot exceed his ranks in Intimidating.',
            activation: 'aio',
            ranked: true,
            trees: 'Agressor',
            reference: 'E-CRB:137',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Fearsome',
            description: "When an adversary becomes engaged with the character, the character may force the adversary to make a fear check (see page 326), with the difficulty equal to the character's ranks in Fearsome. At the GM's discretion, some adversaries may be immune to this talent based on the type ov adversary or ongoing circumstances.",
            activation: 'p',
            ranked: true,
            trees: 'Aggressor',
            reference: 'F-CRB:142',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Street Smarts',
            description: 'The character removes <setback></setback> per rank of Street Smarts from his Streetwise and Knowledge (Underworld) checks.',
            activation: 'p',
            ranked: true,
            trees: 'Shadow, Shien Expert',
            reference: 'E-CRB:144',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Shien Technique',
            description: '_Force talent_. When making a Lightsaber skill check, the character may use Cunning instead of Brawn.',
            activation: 'p',
            ranked: false,
            trees: 'Shien Expert',
            reference: 'F-CRB:151',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Saber Throw',
            description: '_Force talent_. The character may take the Saber Throw action, making a Lightsaber combat check as a ranged attack at one target within medium range, adding <force></force> no greater than his Force rating to the check. The character must spend <force-point></force-point> and succeed on the check to hit is target; he may spend <force-point></force-point> to have his weapon return to his hand after resolving the attack.',
            activation: 'aa',
            ranked: false,
            trees: 'Ataru Striker, Shien Expert',
            reference: 'F-CRB:151',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Disruptive Strike',
            description: "_Force talent_. The character may take a Disruptive Strike action, making a Lightsaber (Cunning) combat check against one engaged target and adding <force></force> no greater that Force rating to the check. The character may spend <force-point></force-point> to add <failure></failure> to the target's next combat check made during this encounter.",
            activation: 'aa',
            ranked: false,
            trees: 'Shien Expert',
            reference: 'F-CRB:142',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Conditioned',
            description: 'The character removes <setback></setback> per rank of Conditioned from his Atheletics and Coordination checks. He reduces the damage and strain suffered from falling by 1 rank per Coordination.',
            activation: 'p',
            ranked: true,
            trees: 'Ataru Striker, Chien Expert, Shii-Cho Knight',
            reference: 'F-CRB:141',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Force Assault',
            description: 'Spend <triumph></triumph> or <advantage></advantage><advantage></advantage><advantage></advantage> on a missed Lightsaber (Willpower) combat check to immediately perform Move Force power action as a maneuver.',
            activation: 'am',
            ranked: false,
            trees: 'Niman Disciple',
            reference: 'F-CRB:143',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Well Rounded',
            description: 'The character chooses any two skills. They permanently become career skills.',
            activation: 'p',
            ranked: true,
            trees: 'Politico, Scholar',
            reference: 'E-CRB:145',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Knowledge Specialization',
            description: 'When the character first aquires this talent, they may choose one Knowledge Skill. When making checks with that skill, they may spend <triumph></triumph> to gain additional <success></success> equal to their ranks in Knowledge Specialization.',
            activation: 'ai',
            ranked: true,
            trees: 'Sage',
            reference: 'F-CRB:146',
            official: true,
            scope: 'public'
        }
    ])
        .map((talent, index) =>
        {
            talent.id = index + 1;
            return talent;
        })
        .sort(sortBy('id'));

    const genesysTalents = talents
        .map(({ trees, ...restTalent }) =>
        {
            const genesisTalent = genesysRefs[restTalent.name] ?? { tier: -1, reference: 'G-CRB:-1' };
            return {
                ...restTalent,
                ...genesisTalent
            };
        })
        .concat([
            {
                id: -1,
                name: 'Hamstring Shot',
                description: 'Once per round, your character may use this talent to perform a ranged combat check against one non-vehicle target within range of the weapon used. If the check is successful, halve the damage inflicted by the attack (before reducing damage by the target’s soak). The target is immobilized until the end of its next turn.',
                activation: 'aa',
                tier: 1,
                ranked: false,
                reference: 'G-CRB:73',
                official: true,
                scope: 'public'
            },
            {
                id: -1,
                name: 'Unremarkable',
                description: 'Other characters add <failure></failure> to any checks made to find or identify your character in a crowd.',
                activation: 'p',
                tier: 1,
                ranked: false,
                reference: 'G-CRB:73',
                official: true,
                scope: 'public'
            }
        ])
        .map((talent, index) =>
        {
            talent.id = index + 1;
            return talent;
        })
        .sort(sortBy('id'));

    // Deletes ALL existing entries
    await knex('eote_talent').del().where({ official: true });
    await knex('genesys_talent').del().where({ official: true });

    // Inserts seed entries
    await Promise.all(eoteTalents.map((talent) => knex('eote_talent').insert(talent)));
    await Promise.all(genesysTalents.map((talent) => knex('genesys_talent').insert(talent)));
};

//----------------------------------------------------------------------------------------------------------------------
