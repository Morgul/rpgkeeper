//----------------------------------------------------------------------------------------------------------------------
// SystemManager
//----------------------------------------------------------------------------------------------------------------------

// Systems
import Risus from '../systems/risus/system';
import Fate from '../systems/fate/system';
import Wfrp from '../systems/wfrp/system';
import { Genesys, EdgeOfTheEmpire } from '../systems/eote/system';
import { BaseSystem } from '../systems/base';
import { Character } from '../models/character';

//----------------------------------------------------------------------------------------------------------------------

class SystemManager
{
    public systems : BaseSystem[];

    constructor()
    {
        this.systems = [
            Risus,
            Fate,
            Genesys,
            EdgeOfTheEmpire,
            Wfrp
        ];

        this.systems.forEach((system) => system.init());
    } // end constructor

    get(id : string) : BaseSystem | undefined
    {
        return this.systems.find((sys) => sys.id === id);
    } // end get

    async validateCharacterDetails(character : Character) : Promise<Character>
    {
        const system = this.get(character.system);
        if(system)
        {
            return system.validateCharacterDetails(character);
        }
        else
        {
            return character;
        } // end if
    } // end validateCharacterDetails
} // end SystemManager

//----------------------------------------------------------------------------------------------------------------------

export default new SystemManager();

//----------------------------------------------------------------------------------------------------------------------
