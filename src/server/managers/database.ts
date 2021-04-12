// ---------------------------------------------------------------------------------------------------------------------
// Database Manager
// ---------------------------------------------------------------------------------------------------------------------

import configMan from './config';
import Knex, { QueryBuilder, RawBinding } from 'knex';

import { AppError } from '../errors';

import logging from 'trivial-logging';
const logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

interface DBConfig extends Knex.Config<any> {
    traceQueries : boolean
}

// ---------------------------------------------------------------------------------------------------------------------

const useTestDB = configMan.get('useTestDB', false);

// eslint-disable-next-line no-use-before-define
const dbConfig : DBConfig = _buildConfig();
let db : Knex | undefined;

// ---------------------------------------------------------------------------------------------------------------------

function _buildConfig() : DBConfig
{
    const config : DBConfig = configMan.get('database', {
        client: 'sqlite3',
        connection: {
            filename: './db/rpgk.db'
        },
        useNullAsDefault: true
    }) as DBConfig;

    // The 'testDB' is an in-memory sqlite database. This makes testing easier.
    if(useTestDB)
    {
        config.client = 'sqlite3';
        config.connection = { filename: ':memory:' };

        // This is currently required by knex to prevent timeouts.
        // Reference: https://github.com/tgriesser/knex/issues/1871
        config.pool = {
            min: 1,
            max: 1,
            idleTimeoutMillis: 1000 * 60 * 60 * 100 // 100 hours
        };
    } // end if

    // We have some special sqlite configuration we need to do
    if(config.client === 'sqlite3')
    {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const afterCreate = config?.pool?.afterCreate;

        // Create a new 'afterCreate' function that sets up sqlite.
        const newAfterCreate = (dbConn, done) : void =>
        {
            dbConn.run('PRAGMA foreign_keys = ON', (err) =>
            {
                if(!err && config?.traceQueries)
                {
                    // Turn on tracing
                    dbConn.on('trace', (queryString) =>
                    {
                        logger.debug('QUERY TRACE:', queryString);
                    });

                    if(afterCreate)
                    {
                        return afterCreate(dbConn, done);
                    } // end if
                } // end if

                done(err, dbConn);
            });
        };

        config.pool = config.pool ?? {};
        config.pool.afterCreate = newAfterCreate;
    } // end if

    logger.debug('Database config:', config);

    return config;
} // end _buildConfig

async function _setupDB() : Promise<Knex>
{
    if(!db)
    {
        throw new AppError('Database not initialized!', 'DB_NOT_INITIALIZED');
    } // end if

    await db('knex_migrations')
        .select()
        .limit(1)
        .catch(async(error) =>
        {
            if(error.code === 'SQLITE_ERROR')
            {
                if(!db)
                {
                    throw new AppError('Database not initialized!', 'DB_NOT_INITIALIZED');
                } // end if

                logger.warn('No existing database, creating one.');

                await db.migrate.latest({ directory: './dist/src/server/knex/migrations' });
                await db.seed.run({ directory: './dist/src/server/knex/seeds' });

                return db;
            }
            else
            {
                throw error;
            } // end if
        });

    // Cleanup the migration references; ensure we keep the extensions as `.js`;
    await db.update({ name: db.raw('replace(name, \'.ts\', \'.js\')') }).from('knex_migrations');

    // -----------------------------------------------------------------------------------------------------------------
    // Migrations
    // -----------------------------------------------------------------------------------------------------------------

    logger.info('Running any needed migrations...');

    // Migrate to the latest migration
    await db.migrate.latest({ directory: './dist/src/server/knex/migrations' });

    logger.info('Migrations complete.');

    // -----------------------------------------------------------------------------------------------------------------
    // Seeds
    // -----------------------------------------------------------------------------------------------------------------

    logger.info('Running seeds...');

    await db.seed.run({ directory: './dist/src/server/knex/seeds' });

    logger.info('Seeds complete.');

    // -----------------------------------------------------------------------------------------------------------------

    return db;
} // _setupDB

// ---------------------------------------------------------------------------------------------------------------------

export async function init() : Promise<void>
{
    if(!db)
    {
        db = Knex(dbConfig);
        await _setupDB();
    } // end if
} // end init

export function getConfig() : DBConfig
{
    return dbConfig;
} // end getConfig

export function getDB() : Knex
{
    if(!db)
    {
        throw new AppError('Database not initialized!', 'DB_NOT_INITIALIZED');
    } // end if

    return db;
} // end getDB

export function table(tableName : string) : QueryBuilder
{
    if(!db)
    {
        throw new AppError('Database not initialized!', 'DB_NOT_INITIALIZED');
    } // end if

    return db(tableName);
} // end table

export function raw(sql : string, bindings : RawBinding) : Promise<Knex>
{
    if(!db)
    {
        throw new AppError('Database not initialized!', 'DB_NOT_INITIALIZED');
    } // end if

    return db.raw(sql, bindings);
} // end raw

// ---------------------------------------------------------------------------------------------------------------------
