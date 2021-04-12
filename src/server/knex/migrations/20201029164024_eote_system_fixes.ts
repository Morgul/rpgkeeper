//----------------------------------------------------------------------------------------------------------------------
// Fix tables for EotE/Genesys
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function up(knex : Knex) : Promise<Knex.QueryBuilder>
{
    //------------------------------------------------------------------------------------------------------------------
    // Step 1: Rename tables, drop indexes
    //------------------------------------------------------------------------------------------------------------------

    // Genesys Tables
    await knex.schema.renameTable('genesys_weapon', 'bk_genesys_weapon');
    await knex.schema.renameTable('eote_weapon', 'bk_eote_weapon');

    //------------------------------------------------------------------------------------------------------------------
    // Step 2: Declare new tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.createTable('genesys_weapon', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('skill').notNullable();
        table.integer('damage').notNullable()
            .defaultTo(0);
        table.integer('critical_rating').notNullable()
            .defaultTo(0);
        table.string('range').notNullable();
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.json('qualities').notNullable()
            .defaultTo('[]');
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');
    });

    await knex.schema.createTable('eote_weapon', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('skill').notNullable();
        table.integer('damage').notNullable()
            .defaultTo(0);
        table.integer('critical_rating').notNullable()
            .defaultTo(0);
        table.string('range').notNullable();
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.json('qualities').notNullable()
            .defaultTo('[]');
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

    const bk_genesys_weapon = await knex('bk_genesys_weapon').select();
    const bk_eote_weapon = await knex('bk_eote_weapon').select();

    // Convert damage to an integer
    bk_genesys_weapon.forEach((weap) => weap.damage = parseInt(weap.damage));
    bk_eote_weapon.forEach((weap) => weap.damage = parseInt(weap.damage));

    bk_genesys_weapon.length > 0 ? await knex('genesys_weapon').insert(bk_genesys_weapon) : undefined;
    bk_eote_weapon.length > 0 ? await knex('eote_weapon').insert(bk_eote_weapon) : undefined;

    //------------------------------------------------------------------------------------------------------------------
    // Step 4: Delete bk_* tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.dropTable('bk_genesys_weapon');
    await knex.schema.dropTable('bk_eote_weapon');

    //------------------------------------------------------------------------------------------------------------------
    // Step 5: Re-add Indexes
    //------------------------------------------------------------------------------------------------------------------

    knex.schema.table('genesys_weapon', (table) =>
    {
        table.unique([ 'name', 'scope', 'owner' ]);
    });

    knex.schema.table('eote_weapon', (table) =>
    {
        table.unique([ 'name', 'scope', 'owner' ]);
    });
}

//----------------------------------------------------------------------------------------------------------------------

export async function down(knex : Knex) : Promise<Knex.QueryBuilder>
{
    //------------------------------------------------------------------------------------------------------------------
    // Step 1: Rename tables.
    //------------------------------------------------------------------------------------------------------------------

    // Genesys Tables
    await knex.schema.renameTable('genesys_weapon', 'bk_genesys_weapon');
    await knex.schema.renameTable('eote_weapon', 'bk_eote_weapon');

    //------------------------------------------------------------------------------------------------------------------
    // Step 2: Declare new tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.createTable('genesys_weapon', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('skill').notNullable();
        table.string('damage').notNullable();
        table.integer('critical_rating').notNullable()
            .defaultTo(0);
        table.string('range').notNullable();
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.json('qualities').notNullable()
            .defaultTo('[]');
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');
    });

    await knex.schema.createTable('eote_weapon', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('skill').notNullable();
        table.string('damage').notNullable();
        table.integer('critical_rating').notNullable()
            .defaultTo(0);
        table.string('range').notNullable();
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.json('qualities').notNullable()
            .defaultTo('[]');
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

    const bk_genesys_weapon = await knex('bk_genesys_weapon').select();
    const bk_eote_weapon = await knex('bk_eote_weapon').select();

    // Convert damage to an integer
    bk_genesys_weapon.forEach((weap) => weap.damage = parseInt(weap.damage));
    bk_eote_weapon.forEach((weap) => weap.damage = parseInt(weap.damage));

    bk_genesys_weapon.length > 0 ? await knex('genesys_weapon').insert(bk_genesys_weapon) : undefined;
    bk_eote_weapon.length > 0 ? await knex('eote_weapon').insert(bk_eote_weapon) : undefined;

    //------------------------------------------------------------------------------------------------------------------
    // Step 4: Delete bk_* tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.dropTable('bk_genesys_weapon');
    await knex.schema.dropTable('bk_eote_weapon');

    //------------------------------------------------------------------------------------------------------------------
    // Step 5: Re-add Indexes
    //------------------------------------------------------------------------------------------------------------------

    knex.schema.table('genesys_weapon', (table) =>
    {
        table.unique([ 'name', 'scope', 'owner' ]);
    });

    knex.schema.table('eote_weapon', (table) =>
    {
        table.unique([ 'name', 'scope', 'owner' ]);
    });
}

//----------------------------------------------------------------------------------------------------------------------
