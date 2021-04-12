//----------------------------------------------------------------------------------------------------------------------
/// ClassService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import $http from 'axios';

//----------------------------------------------------------------------------------------------------------------------

class ClassService 
{
    constructor()
    {
        this._classes = {};
    } // end constructor

    get(classID, reload)
    {
        const classObj = this._classes[classID];
        if(reload || !classObj)
        {
            return $http.get(`/systems/dnd35/classes/${ classID }`)
                .then((response) =>
                {
                    this._classes[classID] = response.data;

                    return Promise.resolve(response.data);
                })
                .catch((error) =>
                {
                    if(error.status == 404)
                    {
                        console.error(`Class with id '${ classID }' not found.`);
                    }
                    else
                    {
                        console.error('Error getting class:', error);
                    } // end if
                });
        }
        else
        {
            return Promise.resolve(classObj);
        } // end if
    }
} // end ClassService

//----------------------------------------------------------------------------------------------------------------------

export default new ClassService();

//----------------------------------------------------------------------------------------------------------------------
