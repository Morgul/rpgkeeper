//----------------------------------------------------------------------------------------------------------------------
// UGC Moderation Tables Migration
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function up(knex : Knex) : Promise<Knex.QueryBuilder>
{
    await knex.schema.createTable('ugc_mod_comment', (table) =>
    {
        table.increments('comment_id').primary();
        table.text('comment').notNullable();
        table.integer('account_id')
            .references('account.account_id')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('mod_id')
            .references('ugc_moderation.mod_id')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('created').notNullable()
            .defaultTo(knex.fn.now());
        table.json('metadata').notNullable()
            .defaultTo('{}');
    });

    await knex.schema.createTable('ugc_moderation', (table) =>
    {
        table.increments('mod_id').primary();
        table.string('table_name').notNullable();
        table.string('supplement_id').notNullable();
        table.string('status').notNullable(); // 'pending', 'approved', 'rejected'
    });
}

//----------------------------------------------------------------------------------------------------------------------

export async function down(knex : Knex) : Promise<Knex.QueryBuilder>
{
    await knex.schema.dropTable('ugc_mod_comment');
    await knex.schema.dropTable('ugc_moderation');
}

//----------------------------------------------------------------------------------------------------------------------
