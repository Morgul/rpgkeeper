//----------------------------------------------------------------------------------------------------------------------
/// GenericCharacter
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
// import rpgdice from 'rpgdicejs';
import Vue from 'vue';

// Services
import raceSvc from '../services/race';
import classSvc from '../services/class';

// Base Model
import BaseSystemCharacterModel from '../../../client/components/character/BaseSystemCharacterModel';

//----------------------------------------------------------------------------------------------------------------------

class DnD35Character extends BaseSystemCharacterModel
{
    constructor(base, system)
    {
        super(base, system);
        this._race = undefined;

        window.char = this;

        this.refresh();
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Static Data
    //------------------------------------------------------------------------------------------------------------------

    get genderOptions()
    {
        return [
            { value: 'M', display: 'Male' },
            { value: 'F', display: 'Female' },
            { value: 'O', display: 'Other' }
        ];
    }

    get alignmentOptions()
    {
        return [
            { value: 'LG', display: 'Lawful Good' },
            { value: 'NG', display: 'Neutral Good' },
            { value: 'CG', display: 'Chaotic Good' },
            { value: 'LN', display: 'Lawful Neutral' },
            { value: 'N', display: 'True Neutral' },
            { value: 'CN', display: 'Chaotic Neutral' },
            { value: 'LE', display: 'Lawful Evil' },
            { value: 'NE', display: 'Neutral Evil' },
            { value: 'CE', display: 'Chaotic Evil' }
        ];
    }

    get sizeOptions()
    {
        return [
            { value: 'T', display: 'Tiny' },
            { value: 'S', display: 'Small' },
            { value: 'M', display: 'Medium' },
            { value: 'L', display: 'Large' },
            { value: 'H', display: 'Huge' },
            { value: 'G', display: 'Gigantic' }
        ];
    }

    get defaultSkills()
    {
        return [
            { name: 'Appraise', ability: 'intelligence', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Balance', ability: 'dexterity', armorPenalty: true, untrained: true, ranks: 0 },
            { name: 'Bluff', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Climb', ability: 'strength', armorPenalty: true, untrained: true, ranks: 0 },
            { name: 'Concentration', ability: 'constitution', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Decipher Script', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Diplomacy', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Disable Device', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Disguise', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Escape Artist', ability: 'dexterity', armorPenalty: true, untrained: true, ranks: 0 },
            { name: 'Forgery', ability: 'intelligence', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Gather Information', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Handle Animal', ability: 'charisma', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Heal', ability: 'wisdom', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Hide', ability: 'dexterity', armorPenalty: true, untrained: true, ranks: 0 },
            { name: 'Intimidate', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Jump', ability: 'strength', armorPenalty: true, untrained: true, ranks: 0 },
            { name: 'Knowledge (Arcana)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (Arch/Eng)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (Dungeoneering)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (Geography)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (History)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (Local)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (Nature)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (Nobility/Royalty)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (The Planes)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (Psionics)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Knowledge (Religion)', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Listen', ability: 'wisdom', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Move Silently', ability: 'dexterity', armorPenalty: true, untrained: true, ranks: 0 },
            { name: 'Open Lock', ability: 'dexterity', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (Act)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (Comedy)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (Dance)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (Keyboard)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (Oratory)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (Percussion)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (String Instrument)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (Wind Instrument)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Perform (Sing)', ability: 'charisma', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Ride', ability: 'dexterity', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Search', ability: 'intelligence', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Sense Motive', ability: 'wisdom', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Slight of Hand', ability: 'dexterity', armorPenalty: true, untrained: false, ranks: 0 },
            { name: 'Spellcraft', ability: 'intelligence', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Spot', ability: 'wisdom', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Survival', ability: 'wisdom', armorPenalty: false, untrained: true, ranks: 0 },
            { name: 'Swim', ability: 'strength', armorPenalty: true, untrained: true, ranks: 0 },
            { name: 'Tumble', ability: 'dexterity', armorPenalty: true, untrained: false, ranks: 0 },
            { name: 'Use Magic Device', ability: 'charisma', armorPenalty: false, untrained: false, ranks: 0 },
            { name: 'Use Rope', ability: 'dexterity', armorPenalty: false, untrained: true, ranks: 0 }
        ];
    }

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    // Populated
    get race() { return this._race; }

    // Class and level
    get classes() { return this._system.classes; }

    // Basic Biographic info
    get raceID() { return this._system.raceID; }
    set raceID(val) { Vue.set(this._system, 'raceID', val); this.save(); }
    get age() { return this._system.age; }
    set age(val) { Vue.set(this._system, 'age', val); this.save(); }
    get height() { return this._system.height; }
    set height(val) { Vue.set(this._system, 'height', val); this.save(); }
    get gender() { return this._system.gender; }
    set gender(val) { Vue.set(this._system, 'gender', val); this.save(); }
    get alignment() { return this._system.alignment; }
    set alignment(val) { Vue.set(this._system, 'alignment', val); this.save(); }
    get speed() { return this._system.speed; }
    set speed(val) { Vue.set(this._system, 'speed', val); this.save(); }
    get languages() { return this._system.languages; }
    get size()
    {
        if(this.race)
        {
            return (_.find(this.sizeOptions, { value: this.race.size }) || {}).display;
        } // end if
    }

    // Abilities
    get strength() { return this._system.strength; }
    set strength(val) { Vue.set(this._system, 'strength', val); this.save(); }
    get dexterity() { return this._system.dexterity; }
    set dexterity(val) { Vue.set(this._system, 'dexterity', val); this.save(); }
    get constitution() { return this._system.constitution; }
    set constitution(val) { Vue.set(this._system, 'constitution', val); this.save(); }
    get intelligence() { return this._system.intelligence; }
    set intelligence(val) { Vue.set(this._system, 'intelligence', val); this.save(); }
    get wisdom() { return this._system.wisdom; }
    set wisdom(val) { Vue.set(this._system, 'wisdom', val); }
    get charisma() { return this._system.charisma; }
    set charisma(val) { Vue.set(this._system, 'charisma', val); this.save(); }

    // AbilityMods
    get strMod() { return Math.floor((this._system.strength - 10) / 2 || 0); }
    get dexMod() { return Math.floor((this._system.dexterity - 10) / 2 || 0); }
    get conMod() { return Math.floor((this._system.constitution - 10) / 2 || 0); }
    get intMod() { return Math.floor((this._system.intelligence - 10) / 2 || 0); }
    get wisMod() { return Math.floor((this._system.wisdom - 10) / 2 || 0); }
    get chaMod() { return Math.floor((this._system.charisma - 10) / 2 || 0); }

    // Health
    get hp() { return this._system.hp; }
    get damageReduction() { return this._system.damageReduction; }

    // Combat
    get baseAttackBonus() { return this._system.baseAttackBonus; }
    set baseAttackBonus(val) { Vue.set(this._system, 'baseAttackBonus', val); this.save(); }
    get spellResistance() { return this._system.spellResistance; }
    set spellResistance(val) { Vue.set(this._system, 'spellResistance', val); this.save(); }
    get attacks() { return this._system.attacks; }

    // Additional Character details
    get experience() { return this._system.experience; }
    set experience(val) { Vue.set(this._system, 'experience', val); this.save(); }
    get wealth() { return this._system.wealth; }
    set wealth(val) { Vue.set(this._system, 'wealth', val); this.save(); }
    get skills()
    {
        if(!this._system.skills || this._system.skills.length < 1)
        {
            this._system.skills = _.cloneDeep(this.defaultSkills);
            this.save();
        } // end if

        return this._system.skills;
    }

    get bonuses() { return this._system.bonuses; }
    get feats() { return this._system.feats; }
    get specialAbilities() { return this._system.specialAbilities; }

    // Magic
    get spells() { return this._system.spells; }
    get spellSave() { return this._system.spellSave; }
    set spellSave(val) { Vue.set(this._system, 'spellSave', val); this.save(); }
    get spellFailure() { return this._system.spellFailure; }
    set spellFailure(val) { Vue.set(this._system, 'spellFailure', val); this.save(); }
    get spellLevels() { return this._system.spellLevels; }

    // Equipment
    get armor() { return this._system.armor; }
    set armor(val) { Vue.set(this._system, 'armor', val); this.save(); }
    get shield() { return this._system.shield; }
    set shield(val) { Vue.set(this._system, 'shield', val); this.save(); }
    get protectiveItem1() { return this._system.protectiveItem1; }
    set protectiveItem1(val) { Vue.set(this._system, 'protectiveItem1', val); this.save(); }
    get protectiveItem2() { return this._system.protectiveItem2; }
    set protectiveItem2(val) { Vue.set(this._system, 'protectiveItem2', val); this.save(); }
    get items() { return this._system.items; }

    // Misc
    get rolls() { return this._system.rolls; }
    get notes() { return this._system.notes; }
    get conditions() { return this._system.conditions; }

    //------------------------------------------------------------------------------------------------------------------
    // Private Overrides
    //------------------------------------------------------------------------------------------------------------------

    _ensureValidity()
    {
        super._ensureValidity();
    } // end _ensureValidity

    _loadSystemChar()
    {
        return super._loadSystemChar()
            .then(() =>
            {
                if(this.raceID)
                {
                    return raceSvc.get(this.raceID, true)
                        .then((race) =>
                        {
                            this._race = race;
                        });
                } // end if
            })
            .then(() =>
            {
                return Promise.map(this.classes, (classObj) =>
                {
                    return classSvc.get(classObj.classID)
                        .then((classDef) =>
                        {
                            Vue.set(classObj, 'class', classDef);
                        });
                });
            });
    } // end _loadSystemChar

    _cleanForSave()
    {
        // Ensure we're a plain object
        const char = JSON.parse(JSON.stringify(this._system));

        // Clean classes
        char.classes = _.map(char.classes, (classObj) =>
        {
            return {
                classID: classObj.classID,
                level: classObj.level
            };
        });

        // Clean notes
        char.notes = _.map(char.notes, (note) =>
        {
            return {
                name: note.name,
                content: note.content
            };
        });

        return Promise.resolve(char);
    } // end _cleanForSave

    toJSON()
    {
        return _.merge(super.toJSON(), {
            strMod: this.strMod,
            dexMod: this.dexMod,
            intMod: this.intMod,
            conMod: this.conMod,
            wisMod: this.wisMod,
            chaMod: this.chaMod
        });
    }
} // end DnD35Character

//----------------------------------------------------------------------------------------------------------------------

export default DnD35Character;

//----------------------------------------------------------------------------------------------------------------------
