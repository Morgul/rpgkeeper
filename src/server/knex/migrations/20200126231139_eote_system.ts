//----------------------------------------------------------------------------------------------------------------------
// Add tables for EotE/Genesys
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function up(knex : Knex) : Promise<Knex.QueryBuilder>
{
    //------------------------------------------------------------------------------------------------------------------
    // Genesys Tables
    //------------------------------------------------------------------------------------------------------------------

    // The `genesys_ability` table
    await knex.schema.createTable('genesys_ability', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `genesys_motivation` table
    await knex.schema.createTable('genesys_motivation', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `genesys_talent` table
    await knex.schema.createTable('genesys_talent', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.string('activation').notNullable();
        table.boolean('ranked').notNullable()
            .defaultTo(false);
        table.integer('tier').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `genesys_gear` table
    await knex.schema.createTable('genesys_gear', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `genesys_attachment` table
    await knex.schema.createTable('genesys_attachment', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.string('use_with').notNullable();
        table.text('modifiers').notNullable();
        table.integer('hp_required').notNullable()
            .defaultTo(1);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `genesys_quality` table
    await knex.schema.createTable('genesys_quality', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.boolean('passive').notNullable()
            .defaultTo(false);
        table.boolean('ranked').notNullable()
            .defaultTo(false);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `genesys_armor` table
    await knex.schema.createTable('genesys_armor', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.integer('defense').notNullable()
            .defaultTo(0);
        table.integer('soak').notNullable()
            .defaultTo(0);
        table.integer('hardpoints').notNullable()
            .defaultTo(0);
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `genesys_weapon` table
    await knex.schema.createTable('genesys_weapon', (table) =>
    {
        table.string('name').primary();
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
    });

    // The `genesys_reference` table
    await knex.schema.createTable('genesys_reference', (table) =>
    {
        table.string('name').primary();
        table.string('abbr').notNullable()
            .unique()
            .index();
        table.string('product_code');
    });

    //------------------------------------------------------------------------------------------------------------------
    // Edge of the Empire Tables
    //------------------------------------------------------------------------------------------------------------------

    // The `eote_ability` table
    await knex.schema.createTable('eote_ability', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `eote_talent` table
    await knex.schema.createTable('eote_talent', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.string('activation').notNullable();
        table.boolean('ranked').notNullable()
            .defaultTo(false);
        table.text('trees').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `eote_gear` table
    await knex.schema.createTable('eote_gear', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `eote_attachment` table
    await knex.schema.createTable('eote_attachment', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.string('use_with').notNullable();
        table.text('base_modifier').notNullable();
        table.text('mod_options').notNullable();
        table.integer('hp_required').notNullable()
            .defaultTo(1);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `eote_quality` table
    await knex.schema.createTable('eote_quality', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.boolean('passive').notNullable()
            .defaultTo(false);
        table.boolean('ranked').notNullable()
            .defaultTo(false);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `eote_armor` table
    await knex.schema.createTable('eote_armor', (table) =>
    {
        table.string('name').primary();
        table.text('description').notNullable();
        table.integer('defense').notNullable()
            .defaultTo(0);
        table.integer('soak').notNullable()
            .defaultTo(0);
        table.integer('hardpoints').notNullable()
            .defaultTo(0);
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
    });

    // The `eote_weapon` table
    await knex.schema.createTable('eote_weapon', (table) =>
    {
        table.string('name').primary();
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
    });

    // The `eote_reference` table
    await knex.schema.createTable('eote_reference', (table) =>
    {
        table.string('name').primary();
        table.string('abbr').notNullable()
            .unique()
            .index();
        table.string('product_code');
    });
}

//----------------------------------------------------------------------------------------------------------------------

export async function down(knex : Knex) : Promise<Knex.QueryBuilder>
{
    // Genesys Tables
    await knex.schema.dropTable('genesys_motivation');
    await knex.schema.dropTable('genesys_ability');
    await knex.schema.dropTable('genesys_talent');
    await knex.schema.dropTable('genesys_gear');
    await knex.schema.dropTable('genesys_attachment');
    await knex.schema.dropTable('genesys_quality');
    await knex.schema.dropTable('genesys_armor');
    await knex.schema.dropTable('genesys_weapon');
    await knex.schema.dropTable('genesys_reference');

    // EotE Tables
    await knex.schema.dropTable('eote_ability');
    await knex.schema.dropTable('eote_talent');
    await knex.schema.dropTable('eote_gear');
    await knex.schema.dropTable('eote_attachment');
    await knex.schema.dropTable('eote_quality');
    await knex.schema.dropTable('eote_armor');
    await knex.schema.dropTable('eote_weapon');
    await knex.schema.dropTable('eote_reference');
}

//----------------------------------------------------------------------------------------------------------------------
