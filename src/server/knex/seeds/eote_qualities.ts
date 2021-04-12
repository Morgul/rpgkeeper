//----------------------------------------------------------------------------------------------------------------------
// Populate a default set of EotE/Genesys Qualities
//----------------------------------------------------------------------------------------------------------------------

import { sortBy } from '../../utils/misc';

//----------------------------------------------------------------------------------------------------------------------

exports.seed = async function(knex)
{
    const genesysRefs = {
        'Accurate': 'G-CRB:86',
        'Auto-Fire': 'G-CRB:86',
        'Blast': 'G-CRB:86',
        'Breach': 'G-CRB:86',
        'Burn': 'G-CRB:86',
        'Concussive': 'G-CRB:87',
        'Cumbersome': 'G-CRB:87',
        'Defensive': 'G-CRB:87',
        'Deflection': 'G-CRB:87',
        'Disorient': 'G-CRB:87',
        'Ensnare': 'G-CRB:87',
        'Guided': 'G-CRB:87',
        'Inaccurate': 'G-CRB:87',
        'Inferior': 'G-CRB:88',
        'Knockdown': 'G-CRB:88',
        'Limited Ammo': 'G-CRB:88',
        'Linked': 'G-CRB:88',
        'Pierce': 'G-CRB:88',
        'Prepare': 'G-CRB:88',
        'Reinforced': 'G-CRB:88',
        'Slow-Firing': 'G-CRB:88',
        'Stun': 'G-CRB:88',
        'Stun Damage': 'G-CRB:88',
        'Sunder': 'G-CRB:88',
        'Superior': 'G-CRB:88',
        'Tractor': 'G-CRB:89',
        'Unwieldy': 'G-CRB:89',
        'Vicious': 'G-CRB:89'
    };

    const qualities = [
        { id: 1, name: 'Accurate', description: 'For each level of this quality, the attacker adds <boost></boost> to their combat checks while using this weapon.', passive: true, ranked: true, reference: 'E-CRB:154', official: true, scope: 'public' },
        { id: 2, name: 'Auto-Fire', description: 'Upgrade the difficulty of the check (<difficulty></difficulty>). If the attack hits, you may trigger an additional weapon hit (<advantage></advantage><advantage></advantage>). This may be triggered multiple times.', passive: false, ranked: false, reference: 'E-CRB:155', official: true, scope: 'public' },
        { id: 3, name: 'Blast', description: 'If the attack is successful, each character engaged with the original target suffers damage equal to the Blast rating plus the number of <success></success> on the check. If the attack misses, you may trigger Blast (<advantage></advantage><advantage></advantage><advantage></advantage>). The original target and all characters engaged suffer damage equal to the Blast rating.', passive: false, ranked: true, reference: 'E-CRB:155', official: true, scope: 'public' },
        { id: 4, name: 'Breach', description: 'Hits ignore one point of vehicle armor for every rating of Breach.', passive: true, ranked: true, reference: 'E-CRB:155', official: true, scope: 'public' },
        { id: 5, name: 'Burn', description: 'One target hit by the attack continues to suffer the weapon\'s base damage for a number of rounds equal to the Burn rating. If multiple targets suffer hits from a weapon with Burn, the quality may be triggered multiple times, affecting a different target each time.', passive: false, ranked: true, reference: 'E-CRB:155', official: true, scope: 'public' },
        { id: 6, name: 'Concussive', description: 'One target hit by the attack is staggered for a number of rounds equal to the Concussive rating. If multiple targets suffer hits from a weapon with Concussive, the quality may be triggered multiple times, affecting a different target each time.', passive: false, ranked: false, reference: 'E-CRB:155', official: true, scope: 'public' },
        { id: 7, name: 'Cumbersome', description: 'The character needs a Brawn characteristic equal to or greater than the weapon’s Cumbersome rating. For each point of Brawn by which the character is deficient, they must increase the difficulty of all checks made while using the weapon by one.', passive: false, ranked: true, reference: 'E-CRB:155', official: true, scope: 'public' },
        { id: 8, name: 'Defensive', description: 'Increase the user’s melee defense by its Defensive rating.', passive: true, ranked: true, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 9, name: 'Deflection', description: 'Increases the user’s ranged defense by its Deflection rating.', passive: true, ranked: true, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 10, name: 'Disorient', description: 'When activated, one target hit by the attack is disoriented for a number of rounds equal to the weapon\'s Disorient rating. The quality may be triggered multiple times if multiple targets are hit by the attack.', passive: false, ranked: true, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 11, name: 'Ensnare', description: 'When activated, one target hit by the attack is immobilized for a number of rounds equal to the weapon\'s Ensnare rating. The quality may be triggered multiple times if multiple targets are hit by the attack.\n\nAn ensnared target may use an action to attempt to break free with a Hard(<difficulty></difficulty><difficulty></difficulty><difficulty></difficulty>) Athletics check.', passive: false, ranked: true, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 12, name: 'Guided', description: 'Can only be triggered (<advantage></advantage><advantage></advantage><advantage></advantage>) if an attack misses. If triggered, the controlling character may make a combat check at the end of the round as an out-of-turn incidental. The difficulty of this combat check is Average (<difficulty></difficulty>); instead of the normal dice pool, use <advantage></advantage> equal to the weapon’s Guided rating. If successful, the attack is resolved normally.', passive: false, ranked: false, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 13, name: 'Inaccurate', description: 'When making an attack with this weapon, add <setback></setback> to the check equal to the Inaccurate rating.', passive: true, ranked: true, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 14, name: 'Inferior', description: 'When making checks with this weapon, add <threat></threat> to the check.', passive: true, ranked: false, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 15, name: 'Knockdown', description: 'When activated (<advantage></advantage> per silhouette unless otherwise specified), one target hit by the attack is knocked prone. The quality may be triggered multiple times if multiple targets are hit by the attack.', passive: false, ranked: false, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 16, name: 'Limited Ammo', description: 'A weapon with this quality may be used to make a number of attacks equal to its Limited Ammo rating before it must be reloaded with a maneuver. In addition, each shot expends one of a limited number of rounds of ammo.', passive: true, ranked: true, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 17, name: 'Linked', description: 'On a successful attack, the weapon deals one hit. The wielder may spend <advantage></advantage><advantage></advantage> to gain an additional hit, and may do so a number of times equal to the weapon’s Linked rating. Additional hits from the Linked weapon may only be applied against the original target.', passive: false, ranked: true, reference: 'E-CRB:156', official: true, scope: 'public' },
        { id: 18, name: 'Pierce', description: 'Any hits from this weapon ignore a number of points point of soak equal to the weapon’s Pierce rating. If the weapon has more ranks of Pierce than the target\'s total soak, it completely ignores the target\'s soak.', passive: true, ranked: true, reference: 'E-CRB:157', official: true, scope: 'public' },
        { id: 19, name: 'Prepare', description: 'The user must perform a number of preparation maneuvers equal to the item\'s Prepare rating before using the item.', passive: true, ranked: true, reference: 'E-CRB:157', official: true, scope: 'public' },
        { id: 20, name: 'Slow-Firing', description: 'After making an attack, the user must wait a number of rounds equal to the Slow-Firing rating before attacking again.', passive: true, ranked: true, reference: 'E-CRB:157', official: true, scope: 'public' },
        { id: 21, name: 'Stun', description: 'When activated, it inflicts strain equal to the weapon\'s Stun rating. It is _not_ reduce by the target\'s soak.', passive: false, ranked: false, reference: 'E-CRB:157', official: true, scope: 'public' },
        { id: 22, name: 'Stun Damage', description: 'A weapon with this quality can only deal strain damage. (This is still reduced by soak.)', passive: false, ranked: false, reference: 'E-CRB:157', official: true, scope: 'public' },
        { id: 23, name: 'Sunder', description: 'When activated (<advantage></advantage>), choose an item openly wielded by the target. The item is damages one step: minor -> moderate -> major -> destroyed. Sunder maybe activated even if the attack is not successful. Sunder may be activated multiple times in the same attack, but only on the same item.', passive: false, ranked: false, reference: 'E-CRB:157', official: true, scope: 'public' },
        { id: 24, name: 'Superior', description: 'Generates automatic <advantage></advantage> on all checks related to its use.', passive: false, ranked: false, reference: 'E-CRB:157', official: true, scope: 'public' },
        { id: 25, name: 'Tractor', description: 'On hit, the target may not move unless it\'s pilot makes a Piloting check with difficulty equal the Tractor rating.', passive: true, ranked: true, reference: 'E-CRB:157', official: true, scope: 'public' },
        { id: 26, name: 'Unwieldy', description: 'For each point of Agility below the weapon\'s Unwieldy rating, increase the difficulty of all checks made with the weapon by one.', passive: true, ranked: true, reference: 'F-CRB:164', official: true, scope: 'public' },
        { id: 27, name: 'Vicious', description: 'When an attack with this weapon results in a Critical Injury, add 10 times the Vicious rating to the result rolled on the critical injury table.', passive: true, ranked: true, reference: 'E-CRB:157', official: true, scope: 'public' }
    ];

    const eoteQualities = [
        { id: 28, name: 'Cortosis', description: 'Weapons with the Cortosis quality are immune to Sunder. Armor with this quality makes the wearer\'s soak immune to the Pierce and Breach qualities.', passive: true, ranked: false, reference: 'E-CRB:155', official: true, scope: 'public' },
        { id: 29, name: 'Ion', description: 'Damage is dealt as system strain (usually on vehicles.) Armor and soak still reduce damage. Droids take ion damage as strain.', passive: true, ranked: false, reference: 'E-CRB:156', official: true, scope: 'public' }
    ]
        .concat(qualities)
        .sort(sortBy('id'));

    const genesysQualities = [
        { id: 28, name: 'Reinforced', description: 'Weapons with the Reinforced quality are immune to Sunder. Armor with this quality makes the wearer\'s soak immune to the Pierce and Breach qualities.', passive: true, ranked: false, reference: 'G-CRB:88', official: true, scope: 'public' }
    ]
        .concat(qualities)
        .sort(sortBy('id'))
        .map((qual) =>
        {
            // Look up the Genesys reference, since all the shared qualities have EotE references.
            return {
                ...qual,
                reference: genesysRefs[qual.name]
            };
        });

    //------------------------------------------------------------------------------------------------------------------
    // Run the seed
    //------------------------------------------------------------------------------------------------------------------

    // Deletes all official entries
    await knex('eote_quality')
        .del()
        .where({ official: true });
    await knex('genesys_quality')
        .del()
        .where({ official: true });

    // Inserts seed entries
    await Promise.all(eoteQualities.map((quality) => knex('eote_quality').insert(quality)));
    await Promise.all(genesysQualities.map((quality) => knex('genesys_quality').insert(quality)));
};

//----------------------------------------------------------------------------------------------------------------------
