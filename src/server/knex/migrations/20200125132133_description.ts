//----------------------------------------------------------------------------------------------------------------------
// Modify description column
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function up(knex : Knex) : Promise<Knex.QueryBuilder>
{
    // Add a new column to the table
    await knex.schema.table('character', (table) =>
    {
        table.text('campaign');
    });

    // Copy from description to campaign
    await knex('character')
        .update({
            campaign: knex.raw('??', [ 'description' ])
        });

    // Copy from biography to description
    await knex('character')
        .update({
            description: knex.raw('??', [ 'biography' ])
        });

    // Drop biography column
    await knex.schema.table('character', (table) =>
    {
        table.dropColumn('biography');
    });
}

//----------------------------------------------------------------------------------------------------------------------

export async function down(knex : Knex) : Promise<Knex.QueryBuilder>
{
    // Add a new column to the table
    await knex.schema.table('character', (table) =>
    {
        table.text('biography');
    });

    // Copy from campaign to description
    await knex('character')
        .update({
            description: knex.raw('??', [ 'campaign' ])
        });

    // Copy from description to biography
    await knex('character')
        .update({
            biography: knex.raw('??', [ 'description' ])
        });

    // Drop campaign column
    await knex.schema.table('character', (table) =>
    {
        table.dropColumn('campaign');
    });
}

//----------------------------------------------------------------------------------------------------------------------
