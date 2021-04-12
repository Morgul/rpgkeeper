//----------------------------------------------------------------------------------------------------------------------
// Fix Genesys Motivation Table
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function up(knex : Knex) : Promise<Knex.QueryBuilder>
{
    //------------------------------------------------------------------------------------------------------------------
    // Step 1: Rename table
    //------------------------------------------------------------------------------------------------------------------

    // Genesys Tables
    await knex.schema.renameTable('genesys_motivation', 'bk_genesys_motivation');

    //------------------------------------------------------------------------------------------------------------------
    // Step 2: Declare new tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.createTable('genesys_motivation', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('type').notNullable()
            .index();
        table.text('description').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');
    });

    //------------------------------------------------------------------------------------------------------------------
    // Step 3: Copy tables.
    //------------------------------------------------------------------------------------------------------------------

    const bk_genesys_motivation = await knex('bk_genesys_motivation').select();

    // Convert damage to an integer
    bk_genesys_motivation.forEach((mot) => mot.type = 'unknown');

    bk_genesys_motivation.length > 0 ? await knex('genesys_motivation').insert(bk_genesys_motivation) : undefined;

    //------------------------------------------------------------------------------------------------------------------
    // Step 4: Delete bk_* tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.dropTable('bk_genesys_motivation');

    //------------------------------------------------------------------------------------------------------------------
    // Step 5: Re-add Indexes
    //------------------------------------------------------------------------------------------------------------------

    knex.schema.table('genesys_motivation', (table) =>
    {
        table.dropUnique([ 'name', 'scope', 'owner' ]);
        table.unique([ 'name', 'scope', 'owner' ]);
    });
}

//----------------------------------------------------------------------------------------------------------------------

export async function down(knex : Knex) : Promise<Knex.QueryBuilder>
{
    //------------------------------------------------------------------------------------------------------------------
    // Step 1: Rename tables.
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.renameTable('genesys_motivation', 'bk_genesys_motivation');

    //------------------------------------------------------------------------------------------------------------------
    // Step 2: Declare new tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.createTable('genesys_motivation', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    //------------------------------------------------------------------------------------------------------------------
    // Step 3: Copy tables.
    //------------------------------------------------------------------------------------------------------------------

    const bk_genesys_motivation = await knex('bk_genesys_motivation').select();

    // Convert damage to an integer
    bk_genesys_motivation.forEach((mot) =>
    {
        delete mot.type;
        return mot;
    });

    bk_genesys_motivation.length > 0 ? await knex('genesys_motivation').insert(bk_genesys_motivation) : undefined;

    //------------------------------------------------------------------------------------------------------------------
    // Step 4: Delete bk_* tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.dropTable('bk_genesys_motivation');

    //------------------------------------------------------------------------------------------------------------------
    // Step 5: Re-add Indexes
    //------------------------------------------------------------------------------------------------------------------

    knex.schema.table('genesys_motivation', (table) =>
    {
        table.dropUnique([ 'name', 'scope', 'owner' ]);
        table.unique([ 'name', 'scope', 'owner' ]);
    });
}

//----------------------------------------------------------------------------------------------------------------------
