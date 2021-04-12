//----------------------------------------------------------------------------------------------------------------------
// CharacterResourceAccess
//----------------------------------------------------------------------------------------------------------------------

import $http from 'axios';

// Interfaces
import { Character, System } from '../../../common/interfaces/common';

// Managers
import sysMan from '../managers/systems';

// Models
import CharacterModel from '../models/character';

// Utils
import toastUtil from '../utils/toast';

//----------------------------------------------------------------------------------------------------------------------

class CharacterResourceAccess
{
    #characters : Map<string, CharacterModel>;

    constructor()
    {
        this.#characters = new Map();
    } // end constructor

    _buildOrUpdateModel(def : Character) : CharacterModel
    {
        let character = this.#characters.get(def.id);
        if(character)
        {
            character.update(def);
        }
        else
        {
            const system = (sysMan.systems as System<Record<string, unknown>>[])
                .find((sys) => sys.id === def.system) ?? { defaults: {} };
            character = new CharacterModel(def, system.defaults);

            // We don't have an id if the character is new.
            if(def.id)
            {
                this.#characters.set(def.id, character);
            } // end if
        } // end if

        return character;
    } // end _buildModel

    $update(def : Character) : void
    {
        if(this.#characters.has(def.id))
        {
            this._buildOrUpdateModel(def);
        }
    }

    $remove(charID : string) : void
    {
        this.#characters.delete(charID);
    }

    async newCharacter(charDef : Character) : Promise<CharacterModel>
    {
        return this._buildOrUpdateModel(charDef);
    } // end newCharacter

    async updateSysDefaults(char : CharacterModel) : Promise<CharacterModel>
    {
        const system = (sysMan.systems as System<Record<string, unknown>>[])
            .find((sys) => sys.id === char.system) ?? { defaults: {} };
        char.updateSysDefaults(system.defaults);

        return char;
    } // end updateSysDefaults

    async getCharacter(charID : string) : Promise<CharacterModel>
    {
        const { data } = await $http.get(`/characters/${ charID }`);
        return this._buildOrUpdateModel(data);
    } // end getCharacter

    async getAllCharacters(owner : string) : Promise<CharacterModel[]>
    {
        const { data } = await $http.get('/characters', { params: { owner } });
        return data.map((def) => this._buildOrUpdateModel(def));
    } // end getAllCharacters

    async saveCharacter(character : CharacterModel) : Promise<CharacterModel>
    {
        const verb = character.id ? 'patch' : 'post';
        const charURL = character.id ? `/characters/${ character.id }` : `/characters`;
        const { data, status } = await ($http[verb](charURL, character)
            .catch((error) =>
            {
                if(error.response.status === 422)
                {
                    console.warn('Invalid character:', error.response.data);
                    toastUtil.warning(`${ error.response.data.message } Resetting character.`, {
                        autoHideDelay: 8000
                    });

                    // Reset the character
                    character.revert();

                    // Needed, or the destructure fails.
                    return { data: undefined, status: undefined };
                }
                else
                {
                    console.error('Failed to save character:', error);
                    toastUtil.error(`${ error.message }. Resetting character.`, {
                        autoHideDelay: 8000
                    });

                    // Reset the character
                    character.revert();

                    // Rethrow, so other logic can handle the failure correctly.
                    throw error;
                } // end if
            }));

        if(status === 205)
        {
            toastUtil.warning('Changes have been made to remove inaccessible content.', {
                autoHideDelay: 8000
            });

            console.warn('Disallowed content was filtered from character on save.');
            if(character.id)
            {
                return this.getCharacter(character.id);
            }
            else
            {
                return character;
            }
        }
        else if(data)
        {
            // We have to make sure the model is in the list of characters before we call `_buildOrUpdateModel`.
            if(!character.id)
            {
                this.#characters.set(data.id, character);
            } // end if

            return this._buildOrUpdateModel(data);
        }
        else
        {
            return character;
        } // end if
    } // end saveCharacter

    async deleteCharacter(character : { id : string }) : Promise<void>
    {
        $http.delete(`/characters/${ character.id }`);
    } // end deleteCharacter
} // end CharacterResourceAccess

//----------------------------------------------------------------------------------------------------------------------

export default new CharacterResourceAccess();

//----------------------------------------------------------------------------------------------------------------------
