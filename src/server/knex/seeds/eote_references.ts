//----------------------------------------------------------------------------------------------------------------------
// Populate a default set of EotE/Genesys References
//----------------------------------------------------------------------------------------------------------------------

exports.seed = async function(knex)
{
    // Deletes ALL existing entries
    await knex('eote_reference').del();
    await knex('genesys_reference').del();

    // Inserts seed entries
    await knex('eote_reference').insert([
        { name: 'Homebrew', abbr: 'HB', product_code: 'HB999' },
        { name: '[Edge of the Empire] Core Rulebook', abbr: 'E-CRB', product_code: 'SWE02' },
        { name: '[Edge of the Empire] Game Master\'s Kit', abbr: 'GMK', product_code: 'SWE03' },
        { name: '[Edge of the Empire] Beyond the Rim', abbr: 'BtR', product_code: 'SWE05' },
        { name: '[Edge of the Empire] Enter the Unknown', abbr: 'EtU', product_code: 'SWE06' },
        { name: '[Edge of the Empire] Suns of Fortune', abbr: 'SoF', product_code: 'SWE07' },
        { name: '[Edge of the Empire] Jewel of Yavin', abbr: 'JoY', product_code: 'SWE09' },
        { name: '[Edge of the Empire] Dangerous Covenants', abbr: 'DC', product_code: 'SWE08' },
        { name: '[Age of Rebellion] Beginner Game - Adventure Book', abbr: 'A-BGA', product_code: 'SWA01' },
        { name: '[Age of Rebellion] Beginner Game - Rulebook', abbr: 'A-BGR', product_code: 'SWA01' },
        { name: '[Age of Rebellion] Operation Shadowpoint', abbr: 'OS', product_code: 'SWAP01' },
        { name: '[Age of Rebellion] Core Rulebook', abbr: 'A-CRB', product_code: 'SWA02' },
        { name: '[Age of Rebellion] Dead in the Water', abbr: 'DitW', product_code: 'SWA03' },
        { name: '[Edge of the Empire] Far Horizons', abbr: 'FH', product_code: 'SWE10' },
        { name: '[Age of Rebellion] Onslaught at Arda I', abbr: 'OaA', product_code: 'SWA04' },
        { name: '[Age of Rebellion] Rescue at Glare Peak', abbr: 'RaGP', product_code: 'OP007' },
        { name: '[Star Wars Roleplaying] Scum and Villainy Adversary Deck', abbr: 'SaVAD', product_code: 'uSWR01' },
        { name: '[Star Wars Roleplaying] Imperials and Rebels Adversary Deck', abbr: 'IaRAD', product_code: 'uSWR02' },
        { name: '[Star Wars Roleplaying] Citizens of the Galaxy Adversary Deck', abbr: 'CotGAD', product_code: 'uSWR03' },
        { name: '[Age of Rebellion] Stay on Target', abbr: 'SoT', product_code: 'SWA25' },
        { name: '[Edge of the Empire] Lords of Nal Hutta', abbr: 'LoNH', product_code: 'SWE11' },
        { name: '[Edge of the Empire] Fly Casual', abbr: 'FC', product_code: 'SWE12' },
        { name: '[Age of Rebellion] Desperate Allies', abbr: 'DA', product_code: 'SWA31' },
        { name: '[Force and Destiny] Beginner Game - Adventure Book', abbr: 'F-BGA', product_code: 'SWF01' },
        { name: '[Force and Destiny] Beginner Game - Rulebook', abbr: 'F-BGR', product_code: 'SWF01' },
        { name: '[Force and Destiny] Core Rulebook', abbr: 'F-CRB', product_code: 'SWF02' },
        { name: '[Force and Destiny] Chronicles of the Gatekeeper', abbr: 'CotG', product_code: 'SWF23' },
        { name: '[Force and Destiny] Hidden Depths', abbr: 'HD', product_code: 'SWF03' },
        { name: '[Edge of the Empire] Mask of the Pirate Queen', abbr: 'MPQ', product_code: 'SWE13' },
        { name: '[Age of Rebellion] Strongholds of Resistance', abbr: 'SoR', product_code: 'SWA30' },
        { name: '[Age of Rebellion] Lead by Example', abbr: 'LbE', product_code: 'SWA36' },
        { name: '[Force and Destiny] Keeping the Peace', abbr: 'KtP', product_code: 'SWF24' },
        { name: '[Edge of the Empire] Beginner Game - Rulebook', abbr: 'E-BGR', product_code: 'SWE01' },
        { name: '[Edge of the Empire] Beginner Game - Adventure Book', abbr: 'E-BGA', product_code: 'SWE01' },
        { name: '[Force and Destiny] Nexus of Power', abbr: 'NoP', product_code: 'SWF29' },
        { name: '[Edge of the Empire] Special Modifications', abbr: 'SM', product_code: 'SWE14' },
        { name: '[Force and Destiny] Savage Spirits', abbr: 'SS', product_code: 'SWF41' },
        { name: '[Age of Rebellion] Forged in Battle', abbr: 'FiB', product_code: 'SWA42' },
        { name: '[Force and Destiny] Endless Vigil', abbr: 'EV', product_code: 'SWF30' },
        { name: '[Age of Rebellion] Friends Like These', abbr: 'FLT', product_code: 'SWA41' },
        { name: '[Edge of the Empire] No Disintegrations', abbr: 'ND', product_code: 'SWE16' },
        { name: '[Force and Destiny] Disciples of Harmony', abbr: 'DoH', product_code: 'SWF35' },
        { name: '[Force and Destiny] Ghosts of Dathomir', abbr: 'GoD', product_code: 'SWF40' },
        { name: '[Age of Rebellion] Fully Operational', abbr: 'FO', product_code: 'SWA47' }
    ]);

    await knex('genesys_reference').insert([
        { name: 'Homebrew', abbr: 'HB', product_code: 'HB999' },
        { name: 'Genesys Core Rulebook', abbr: 'G-CRB', product_code: 'GNS01' },
        { name: 'Genesys Expanded Player\'s Guide', abbr: 'G-EPG', product_code: 'GNS11' },
        { name: 'Realms of Terrinoth', abbr: 'RoT', product_code: 'GNS03' },
        { name: 'Shadow of the Beanstalk', abbr: 'SotB', product_code: 'GNS04' },
        { name: 'Secrets of the Crucible', abbr: 'SotC', product_code: 'GNS12' }
    ]);
};

//----------------------------------------------------------------------------------------------------------------------
