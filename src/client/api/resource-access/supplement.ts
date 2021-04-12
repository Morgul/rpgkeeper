//----------------------------------------------------------------------------------------------------------------------
// SupplementResourceAccess
//----------------------------------------------------------------------------------------------------------------------

import axios from 'axios';

// Interfaces
import { Supplement } from '../../../common/interfaces/common';

//----------------------------------------------------------------------------------------------------------------------

class SupplementResourceAccess
{
    async list(system : string, path : string) : Promise<Supplement[]>
    {
        return axios.get(`/systems/${ system }/${ path }`)
            .then(({ data }) => data);
    } // end list

    async search(system : string, path : string, query : string, key = 'name') : Promise<Supplement>
    {
        const params = {};
        params[key] = `@>${ query }`;

        return axios.get(`/systems/${ system }/${ path }`, { params })
            .then(({ data }) => data);
    } // end search

    async add(system : string, path : string, supplement : Supplement) : Promise<Supplement>
    {
        return axios.post(`/systems/${ system }/${ path }`, supplement)
            .then(({ data }) => data);
    } // end add

    async update(system : string, path : string, supplement : Supplement) : Promise<Supplement>
    {
        return axios.patch(`/systems/${ system }/${ path }/${ supplement.id }`, supplement)
            .then(({ data }) => data);
    } // end update

    async delete(system : string, path : string, id : string) : Promise<void>
    {
        return axios.delete(`/systems/${ system }/${ path }/${ id }`)
            .then(() => undefined);
    } // end delete
} // end SupplementResourceAccess

//----------------------------------------------------------------------------------------------------------------------

export default new SupplementResourceAccess();

//----------------------------------------------------------------------------------------------------------------------
