//----------------------------------------------------------------------------------------------------------------------
// ReferenceManager
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';

// Managers
import * as dbMan from './database';

// Utilities
import { applyFilters } from '../knex/utils';
import { FilterToken } from '../routes/utils/query';

// Models
import { Reference } from '../models/reference';

//----------------------------------------------------------------------------------------------------------------------

class ReferenceManager
{
    async getFiltered(filters : Record<string, FilterToken>, tableName : string) : Promise<Reference[]>
    {
        const db = await dbMan.getDB();
        let query = db(tableName)
            .select(`${ tableName }.name`, `${ tableName }.abbr`, `${ tableName }.product_code as productCode`);

        if(filters && !_.isEmpty(filters))
        {
            query = applyFilters(query, filters);
        } // end if

        return (await query).map(Reference.fromDB);
    } // end getAbility
} // end ReferenceManager

//----------------------------------------------------------------------------------------------------------------------

export default new ReferenceManager();

//----------------------------------------------------------------------------------------------------------------------
