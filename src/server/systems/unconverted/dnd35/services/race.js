//----------------------------------------------------------------------------------------------------------------------
/// RaceService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import $http from 'axios';

//----------------------------------------------------------------------------------------------------------------------

class RaceService 
{
    constructor()
    {
        this._races = {};
    } // end constructor

    get(raceID, reload)
    {
        const race = this._races[raceID];
        if(reload || !race)
        {
            return $http.get(`/systems/dnd35/races/${ raceID }`)
                .then((response) =>
                {
                    this._races[raceID] = response.data;

                    return response.data;
                })
                .catch((error) =>
                {
                    if(error.status == 404)
                    {
                        console.error(`Race with id '${ raceID }' not found.`);
                    }
                    else
                    {
                        console.error('Error getting race:', error);
                    } // end if
                });
        }
        else
        {
            return Promise.resolve(race);
        } // end if
    }
} // end RaceService

//----------------------------------------------------------------------------------------------------------------------

export default new RaceService();

//----------------------------------------------------------------------------------------------------------------------
