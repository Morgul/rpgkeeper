//----------------------------------------------------------------------------------------------------------------------
// Remove Posts
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function up(knex : Knex) : Promise<Knex.QueryBuilder>
{
    await knex.schema.dropTable('post');
}

//----------------------------------------------------------------------------------------------------------------------

export async function down(knex : Knex) : Promise<Knex.QueryBuilder>
{
    await knex.schema.createTable('post', (table) =>
    {
        table.integer('post_id').primary();
        table.integer('account_id')
            .references('account.account_id')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.text('title').notNullable();
        table.string('stinger').notNullable();
        table.string('content').notNullable();
        table.timestamp('created').notNullable()
            .defaultTo(knex.fn.now());
        table.timestamp('edited').notNullable()
            .defaultTo(knex.fn.now());
    });
}

//----------------------------------------------------------------------------------------------------------------------
