//----------------------------------------------------------------------------------------------------------------------
// Fix tables for EotE/Genesys
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function up(knex : Knex) : Promise<Knex.QueryBuilder>
{
    await knex.schema.createTable('eote_forcepower', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.integer('min_rating').notNullable()
            .defaultTo(0);
        table.json('upgrades').notNullable()
            .defaultTo('{}');
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');
    });
}

//----------------------------------------------------------------------------------------------------------------------

export async function down(knex : Knex) : Promise<Knex.QueryBuilder>
{
    await knex.schema.dropTable('eote_forcepower');
}

//----------------------------------------------------------------------------------------------------------------------
