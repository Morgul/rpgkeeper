//----------------------------------------------------------------------------------------------------------------------
// EotE/Genesys Validations
//----------------------------------------------------------------------------------------------------------------------

// Models
import { Account } from '../../models/account';
import { Character } from '../../models/character';

// Managers
import * as accountMan from '../../managers/account';
import * as suppMan from '../../managers/supplement';

//----------------------------------------------------------------------------------------------------------------------

type Motivations = { strength : number | null, flaw : number | null, desire : number | null, fear : number | null };
type SupplementRef = { id : number, [ key : string ] : unknown };

interface CharDetails {
    abilities : number[],
    talents : SupplementRef[],
    gear : SupplementRef[],
    force : { powers : SupplementRef[] },
    armor : {
        attachments : SupplementRef[],
        qualities : SupplementRef[]
    },
    weapons : Array<{ attachments : SupplementRef[], qualities : SupplementRef[] }>
}

function isNumbers(array : number[] | SupplementRef[]) : array is number[]
{
    return typeof array[0] === 'number';
}

//----------------------------------------------------------------------------------------------------------------------

async function validateMotivations(character : Character, account : Account) : Promise<void>
{
    const motivations = <Motivations>character.details.motivations;

    // Check strength
    if(motivations.strength !== null)
    {
        motivations.strength = (await suppMan.exists(motivations.strength, 'motivation', 'genesys', account))
            ? motivations.strength : null;
    } // end if

    // Check flaw
    if(motivations.flaw !== null)
    {
        motivations.flaw = (await suppMan.exists(motivations.flaw, 'motivation', 'genesys', account))
            ? motivations.flaw : null;
    } // end if

    // Check desire
    if(motivations.desire !== null)
    {
        motivations.desire = (await suppMan.exists(motivations.desire, 'motivation', 'genesys', account))
            ? motivations.desire : null;
    } // end if

    // Check fear
    if(motivations.fear !== null)
    {
        motivations.fear = (await suppMan.exists(motivations.fear, 'motivation', 'genesys', account))
            ? motivations.fear : null;
    } // end if
} // end validateMotivations

async function validateSuppRef(suppRefs : number[], type : string, systemPrefix : string, account : Account) : Promise<number[]>
async function validateSuppRef(suppRefs : SupplementRef[], type : string, systemPrefix : string, account : Account) : Promise<SupplementRef[]>
async function validateSuppRef(suppRefs : SupplementRef[] | number[], type : string, systemPrefix : string, account : Account) : Promise<SupplementRef[] | number[]>
{
    let wasNums = false;
    if(isNumbers(suppRefs))
    {
        wasNums = true;
        suppRefs = suppRefs.map((id) => ({ id }));
    }

    const toRemove : number[] = [];

    await Promise.all(suppRefs.map(async(supp) =>
    {
        if(!(await suppMan.exists(supp.id, type, systemPrefix, account)))
        {
            toRemove.push(supp.id);
        } // end if
    }));

    // Set the supps to the filtered ones.
    suppRefs = suppRefs.filter((supp) => !toRemove.includes(supp.id));

    if(wasNums)
    {
        return suppRefs.map(({ id }) => id);
    }
    else
    {
        return suppRefs;
    }
} // end validateSuppRef

//----------------------------------------------------------------------------------------------------------------------
// Top-level Validation Functions
//----------------------------------------------------------------------------------------------------------------------

export async function validateGenesysDetails(character : Character) : Promise<Character>
{
    // We get the owner of the character, as that's how we check for validity; not based on the person wanting to
    // retrieve it.
    const account = await accountMan.get(character.accountID);

    // We pull some type shenanigans to keep from casting every key.
    const details = character.details as unknown as CharDetails;

    // Specific validations
    await validateMotivations(character, account);

    // General validations
    details.abilities = await validateSuppRef(details.abilities, 'ability', 'genesys', account);
    details.talents = await validateSuppRef(details.talents, 'talent', 'genesys', account);
    details.gear = await validateSuppRef(details.gear, 'gear', 'genesys', account);
    details.armor.attachments = await validateSuppRef(details.armor.attachments, 'attachment', 'genesys', account);
    details.armor.qualities = await validateSuppRef(details.armor.qualities, 'quality', 'genesys', account);

    await Promise.all(details.weapons.map(async(weapon) =>
    {
        weapon.attachments = await validateSuppRef(weapon.attachments, 'attachment', 'genesys', account);
        weapon.qualities = await validateSuppRef(weapon.qualities, 'quality', 'genesys', account);
    }));

    return character;
} // end validateGenesysDetails

export async function validateEoteDetails(character : Character) : Promise<Character>
{
    // We get the owner of the character, as that's how we check for validity; not based on the person wanting to
    // retrieve it.
    const account = await accountMan.get(character.accountID);

    // We pull some type shenanigans to keep from casting every key.
    const details = character.details as unknown as CharDetails;

    // Specific validations
    details.force.powers = await validateSuppRef(details.force.powers, 'forcepower', 'eote', account);

    // General validations
    details.abilities = await validateSuppRef(details.abilities, 'ability', 'eote', account);
    details.talents = await validateSuppRef(details.talents, 'talent', 'eote', account);
    details.gear = await validateSuppRef(details.gear, 'gear', 'eote', account);
    details.armor.attachments = await validateSuppRef(details.armor.attachments, 'attachment', 'eote', account);
    details.armor.qualities = await validateSuppRef(details.armor.qualities, 'quality', 'eote', account);

    await Promise.all(details.weapons.map(async(weapon) =>
    {
        weapon.attachments = await validateSuppRef(weapon.attachments, 'attachment', 'eote', account);
        weapon.qualities = await validateSuppRef(weapon.qualities, 'quality', 'eote', account);
    }));

    return character;
} // end validateEoteDetails

//----------------------------------------------------------------------------------------------------------------------
