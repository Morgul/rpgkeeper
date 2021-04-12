//----------------------------------------------------------------------------------------------------------------------
// Knex Migration configuration
//----------------------------------------------------------------------------------------------------------------------

require('ts-node/register');

import knex from 'knex';

// Config
import configMan from './src/server/managers/config';

// Logging
import logging from 'trivial-logging';
logging.setRootLogger('rpgkeeper');
logging.init(configMan.config);

// Managers
import { getConfig } from './src/server/managers/database';

//----------------------------------------------------------------------------------------------------------------------

module.exports = async () =>
{
    const db = knex(getConfig());

    // When this file is run, it expects the migrations to end in .ts, so accommodate that.
    await db('knex_migrations')
        .select()
        .limit(1)
        .then(async() =>
        {
            await db.update({ name: db.raw('replace(name, \'.js\', \'.ts\')') })
                .from('knex_migrations');
        })
        .catch(async(error) =>
        {
            if(error.code !== 'SQLITE_ERROR')
            {
                throw error;
            } // end if
        });


    return {
        ...getConfig(),
        migrations: {
            directory: './src/server/knex/migrations',
            extension: 'ts'
        },
        seeds: {
            directory: './src/server/knex/seeds'
        }
    };
};

//----------------------------------------------------------------------------------------------------------------------

