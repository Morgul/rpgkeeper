//----------------------------------------------------------------------------------------------------------------------
// Populate a default set of EotE/Genesys Attachments
//----------------------------------------------------------------------------------------------------------------------

import { sortBy } from '../../utils/misc';

//----------------------------------------------------------------------------------------------------------------------

exports.seed = async function(knex)
{
    const eoteAttachments = [
        {
            id: -1,
            name: 'Cortosis Weave',
            description: 'Although uncommon and even considered archaic in this day and age, some armorers specially equip protective gear with an underlying weave of rare cortosis. This does tend to make the armor more resistant to being penetrated (especially by energy weapons), but the cost is seldom worth the result. ',
            use_with: 'Any armor.',
            base_modifier: 'Armor gains Cortosis Quality.',
            mod_options: 'None',
            hp_required: 2,
            reference: 'E-CRB:194',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Thermal Shielding System',
            description: 'Utilizing both active and passive cooling systems, along with an insulated body glove and special coatings on the armor plates, this attachment allows a wearer to withstand dangerously high temperatures. This thermal shielding is proof against open flames, molten rock and steel, intense heat, and even some forms of radiation.',
            use_with: 'Any armor that covers the entire body, and can be sealed.',
            base_modifier: 'Reduce Resilience check difficulty against fire and heat. Removes up to <setback></setback><setback></setback> added to checks by heat or fire.',
            mod_options: 'None',
            hp_required: 1,
            reference: 'E-CRB:194',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Heating System',
            description: 'Like thermal shielding, cold shielding is installed in armor to protect the wearer against dangerously low temperatures and frigid environments. Equipped with small, efficient heating elements and double insulated against the cold, this attachment allows a wearer to survive in places where the ambient temperature can be dozens of degrees below freezing.',
            use_with: 'Any armor that covers the entire body, and can be sealed.',
            base_modifier: 'Reduce Resilience check difficulty against cold. Removes up to <setback></setback><setback></setback> added to checks by cold.',
            mod_options: 'None',
            hp_required: 1,
            reference: 'E-CRB:194',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Enhanced Optics Suite',
            description: 'Built into a helmet, this system provides an individual with a host of specialized optical and audio sensors. Each system is equipped with passive light amplification, thermal signature readers, ultrasound pickups, millimeter wave emitters, video capture, and common optical enhancements.',
            use_with: 'Any armor.',
            base_modifier: 'Remove up to <setback></setback><setback></setback> added to Perception, Surveillance, Vigilance, and combat skill checks due to darkness, smoke, or obscured vision.',
            mod_options: '1 Skill (Vigilance) Mod',
            hp_required: 1,
            reference: 'E-CRB:194',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Strength Enhancing System',
            description: 'Strength enhancing systems easily converts a suit of full armor into a power-assisted suit. Composed of a matrix of electrically controlled myomer synthetic muscle fibers backed up with nano-hydraulics, the MSES increases a wearer\'s raw physical strength, allowing him to lift mo re and carry more for longer periods of time.',
            use_with: 'Laminate or other full-body hard armor suits.',
            base_modifier: 'Brawn +1. (Does not increase wounds or soak.)',
            mod_options: ' 2 Skill (Athletics) Mods, 2 Innate Talent (Brace) Mods',
            hp_required: 2,
            reference: 'E-CRB:194',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Optical Camouflage System',
            description: 'Popular with both military scouts and assassins, optical camouflage systems are a wonder of modern stealth technology. Using a series of phased array optical projectors combined with sound baffling equipment and thermal and radiation shielding, Merr-Sonn\'s "Ghost" OCS can render a wearer nearly invisible to the naked eye The PAO projectors allow the wearer to blend in with his surroundings by mimicking them, similar to an animal with active camouflage abilities, and the different radiation shields hide the wearer\'s body heat as well as any electromagnetic radiation from other sensors or communications gear. For all of its utility, however, this system is incredibly fragile and is not recommended for combat.',
            use_with: 'Any armor.',
            base_modifier: 'Upgrade all Stealth check twice.',
            mod_options: 'Innate Talent (Master of Shadows) Mod, 1 Skill (Stealth) Mod',
            hp_required: 2,
            reference: 'E-CRB:195',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Serrated Edge',
            description: 'The simplicity of this mod ification belies its viciousness. Adding a serrated edge to a weapon is someth ing almost anyone can do, and giving a bladed weapon tearing edges ensures it does terrible damage to flesh and bone.',
            use_with: 'Any weapon with a edge.',
            base_modifier: 'Gain Vicious (+1) Quality',
            mod_options: 'None',
            hp_required: 1,
            reference: 'E-CRB:191',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Superior Armor Customization',
            description: 'Any piece of armor can benefit from retooling at the hands of a superior craftsman. A skilled armorsmith can add improved plastoid or even durasteel plating to increase the protection a piece of armor offers even as he decreases its weight and bulk. Of course, such delicate and exacting work can make the armor less customizable in other respects. ',
            use_with: 'Any armor.',
            base_modifier: 'Gain Superior Quality',
            mod_options: 'None',
            hp_required: 1,
            reference: 'E-CRB:195',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Superior Weapon Customization',
            description: 'Even the simplest weapon can benefit from a craftsman\'s touch. A skil led weaponsmith can tweak a weapon to its owner\'s exacting specifications, turning a blunt instrument into a honed and deadly weapon of war. ',
            use_with: 'Any weapon.',
            base_modifier: 'Gain Superior Quality',
            mod_options: 'None',
            hp_required: 1,
            reference: 'E-CRB:191',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Vacuum Sealed',
            description: 'Full body armor can be designed to be sealed against a vacuum, allowing the user to operate in space. This modification provides the armor with enough air and insulation to survive for up to 10 minutes, and obviously also protects against adverse atmospheric environments. ',
            use_with: 'Laminate or battle armor.',
            base_modifier: 'User may ignore the effects of vacuum or poisonous environments for 10 minutes.',
            mod_options: 'None',
            hp_required: 1,
            reference: 'E-CRB:195',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Energy Dispersion System',
            description: 'This minute metallic wiring is designed to distribute electrical shocks across the armor while grounding the user against the energy, reducing the potency of such attacks. It protects against electricity as well as weapons’ Stun settings, although it does not effectively disperse blaster fire.',
            use_with: 'Any Armor.',
            base_modifier: 'When soaking Strain, +2 soak.',
            mod_options: 'None',
            hp_required: 1,
            reference: 'F-CRB:201',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Mono-Molecular Edge',
            description: 'All bladed weapons, even vibro weapons, can benefit from an edge sharpened to mono-molecular thickness and toughened through laser-forging techniques.',
            use_with: 'Any weapon with an edge.',
            base_modifier: 'Decrease the weapon\'s crit rating to a minimum of 1.',
            mod_options: '2 Item Quality (Pierce +1) Mods',
            hp_required: 1,
            reference: 'F-CRB:194',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Shadowsheath',
            description: 'Bounty hunters, assassins, and other criminals often have a need to conceal weapons on their bodies to sneak them past guards or get close to a target without arousing alarm. A shadowsheath utilizes optical camouflage technology, but rather than conceal an entire body, its smaller projector is specifically designed to conceal a single weapon when kept in a holster or sheath.',
            use_with: 'Any weapon with an encumbrance of 2 or less.',
            base_modifier: 'Decrease the weapon\'s crit rating to a minimum of 1.',
            mod_options: 'Upgrade difficulty twice of all checks to detect weapon sheath.',
            hp_required: 1,
            reference: 'F-CRB:194',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Stun Pulse',
            description: 'A stun pulse attachment deals an electric shock to the target, in addition to its weapon\'s normal damage. Generally attached to truncheons or bludgeoning weapons, stun pulses are often used by law enforcement to disable suspects without killing them.',
            use_with: 'Any bludgeoning Melee or Brawn weapons.',
            base_modifier: 'Gain Stun 2.',
            mod_options: '3 Item Quality (Stun + 1) Mods.',
            hp_required: 1,
            reference: 'F-CRB:194',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Extended Hilt',
            description: 'The idea behind the extended hilt modification is to increase the lightsaber’s striking and cutting power by using the leverage of the longer handle and a twohanded grip to help focus the wielder’s strength into the force of the blow.',
            use_with: 'Any lightsaber.',
            base_modifier: 'Gain Superior.',
            mod_options: 'None.',
            hp_required: 1,
            reference: 'F-CRB:197',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Superior Hilt',
            description: 'While most lightsabers are austere and utilitarian, some Jedi have been known to personalize their weapons to better suit their tastes and styles.',
            use_with: 'Any lightsaber.',
            base_modifier: 'Gain Superior.',
            mod_options: 'None.',
            hp_required: 1,
            reference: 'F-CRB:200',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Dantari Crystal',
            description: 'As their name suggests, Dantari crystals are found on the Outer Rim world of Dantooine. Discovered within the eggs of the kinrath—giant, venomous, cave-dwelling arachnids—it is unknown how Dantari crystals come into existence. However, these multihued kyber crystals were once extremely popular among the Jedi. When installed in a lightsaber, a Force-reactive Dantari crystal helps the wielder maintain focus and calm.',
            use_with: 'Any lightsaber.',
            base_modifier: 'Base damage 7, crit rating 2. Gain Breach 1 and Sunder. Spend <forcepoint></forcepoint> to gain two strain if making a Force Check as part of combat.',
            mod_options: '1 Decrease the weapon’s critical rating by 1 to a minimum of 1 Mod, 2 Damage + 1 Mods.',
            hp_required: 2,
            reference: 'F-CRB:196',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Ilum Crystal',
            description: 'The kyber crystals found deep within the caves of the icy planet Hum were prized by the Jedi as some of the best crystals for constructing a lightsaber. Hum featured heavily in Jedi tradition, with young Padawans traveling there as part of their training to commune with the Force and use its guidance to seek out the crystal that would go into the construction of their first lightsaber.',
            use_with: 'Any lightsaber.',
            base_modifier: 'Base damage 6, crit rating 2. Gain Breach 1 and Sunder.',
            mod_options: '2 Item Quality (Vicious +1) Mods, 4 Damage + 1 Mods, 1 Decrease the weapon’s critical rating by 1 to a minimum of 1 Mod.',
            hp_required: 2,
            reference: 'F-CRB:197',
            official: true,
            scope: 'public'
        },
    ]
        .map((attachment, index) =>
        {
            attachment.id = index + 1;
            return attachment;
        })
        .sort(sortBy('id'));

    const genesysAttachments = [
        {
            id: -1,
            name: 'Deflective Plating',
            description: 'This attachment applies angled plates or mildly reflective surfaces to help deflect incoming ranged attacks.',
            use_with: 'Any armor.',
            modifiers: 'Ranged Defense +1.',
            hp_required: 1,
            reference: 'G-CRB:209',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Enhance Lifting Servos',
            description: 'Futuristic servos (or other, similar devices) can be worked into suits of hard carapace armor to make them powered and let the user lift and carry far more than they could normally',
            use_with: 'Any \'hard\' armor.',
            modifiers: 'Encumbrance Threshold +5, Cumbersome (carried weapons) -1.',
            hp_required: 2,
            reference: 'G-CRB:209',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Intimidating Visage',
            description: 'Warriors from many cultures paint their armor or add imposing face masks to intimidate opponents.',
            use_with: 'Any armor.',
            modifiers: 'Add <success></success> to Coercion checks, and <failure></failure> to Charm checks.',
            hp_required: 0,
            reference: 'G-CRB:209',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Rare Metals',
            description: 'Many fantasy settings feature rare, nearly magical metals that can be used to create superior armor.',
            use_with: 'Chain or plate armor.',
            modifiers: 'Armor Encumbrance -2, one fewer <setback></setback> on Stealth checks.',
            hp_required: 2,
            reference: 'G-CRB:209',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Reinforced Plating',
            description: 'This attachment represents adding extra layers of armor or using stronger materials to reinforce the armor.',
            use_with: 'Any armor that uses hardened plates.',
            modifiers: 'Gain Reinforced equality, Encumbrance +1.',
            hp_required: 2,
            reference: 'G-CRB:209',
            official: true,
            scope: 'public'
        },
        {
            id: -1,
            name: 'Vacuum Sealed',
            description: 'This attachment equips the armor with breathing gear and seals it against vacuum.',
            use_with: 'Any armor.',
            modifiers: 'User may ignore the effects of vacuum or poisonous environments for 1 hour.',
            hp_required: 1,
            reference: 'G-CRB:209',
            official: true,
            scope: 'public'
        }
    ]
        .map((attachment, index) =>
        {
            attachment.id = index + 1;
            return attachment;
        })
        .sort(sortBy('id'));

    // Deletes ALL existing entries
    await knex('eote_attachment').del().where({ official: true });
    await knex('genesys_attachment').del().where({ official: true });

    // Inserts seed entries
    await Promise.all(eoteAttachments.map((attachment) => knex('eote_attachment').insert(attachment)));
    await Promise.all(genesysAttachments.map((attachment) => knex('genesys_attachment').insert(attachment)));
};

//----------------------------------------------------------------------------------------------------------------------
