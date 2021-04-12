//----------------------------------------------------------------------------------------------------------------------
// UGC Tables Migration
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

import * as eoteMigration from './20200126231139_eote_system';

//----------------------------------------------------------------------------------------------------------------------

export async function up(knex : Knex) : Promise<Knex.QueryBuilder>
{
    //------------------------------------------------------------------------------------------------------------------
    // Step 1: Rename tables.
    //------------------------------------------------------------------------------------------------------------------

    // Genesys Tables
    await knex.schema.renameTable('genesys_motivation', 'bk_genesys_motivation');
    await knex.schema.renameTable('genesys_ability', 'bk_genesys_ability');
    await knex.schema.renameTable('genesys_talent', 'bk_genesys_talent');
    await knex.schema.renameTable('genesys_gear', 'bk_genesys_gear');
    await knex.schema.renameTable('genesys_attachment', 'bk_genesys_attachment');
    await knex.schema.renameTable('genesys_quality', 'bk_genesys_quality');
    await knex.schema.renameTable('genesys_armor', 'bk_genesys_armor');
    await knex.schema.renameTable('genesys_weapon', 'bk_genesys_weapon');

    // EotE Tables
    await knex.schema.renameTable('eote_ability', 'bk_eote_ability');
    await knex.schema.renameTable('eote_talent', 'bk_eote_talent');
    await knex.schema.renameTable('eote_gear', 'bk_eote_gear');
    await knex.schema.renameTable('eote_attachment', 'bk_eote_attachment');
    await knex.schema.renameTable('eote_quality', 'bk_eote_quality');
    await knex.schema.renameTable('eote_armor', 'bk_eote_armor');
    await knex.schema.renameTable('eote_weapon', 'bk_eote_weapon');

    //------------------------------------------------------------------------------------------------------------------
    // Step 2: Declare new tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.createTable('genesys_ability', (table) =>
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

    await knex.schema.createTable('genesys_talent', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('activation').notNullable();
        table.boolean('ranked').notNullable()
            .defaultTo(false);
        table.integer('tier').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    await knex.schema.createTable('genesys_gear', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    await knex.schema.createTable('genesys_attachment', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('use_with').notNullable();
        table.text('modifiers').notNullable();
        table.integer('hp_required').notNullable()
            .defaultTo(1);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    await knex.schema.createTable('genesys_quality', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.boolean('passive').notNullable()
            .defaultTo(false);
        table.boolean('ranked').notNullable()
            .defaultTo(false);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    await knex.schema.createTable('genesys_armor', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
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
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

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

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    // EotE Tables
    await knex.schema.createTable('eote_ability', (table) =>
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

    await knex.schema.createTable('eote_talent', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('activation').notNullable();
        table.boolean('ranked').notNullable()
            .defaultTo(false);
        table.text('trees').notNullable();
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    await knex.schema.createTable('eote_gear', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.integer('encumbrance').notNullable()
            .defaultTo(0);
        table.integer('rarity').notNullable()
            .defaultTo(0);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    await knex.schema.createTable('eote_attachment', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.string('use_with').notNullable();
        table.text('base_modifier').notNullable();
        table.text('mod_options').notNullable();
        table.integer('hp_required').notNullable()
            .defaultTo(1);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    await knex.schema.createTable('eote_quality', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.boolean('passive').notNullable()
            .defaultTo(false);
        table.boolean('ranked').notNullable()
            .defaultTo(false);
        table.text('reference').notNullable();
        table.boolean('official').notNullable()
            .defaultTo(false);
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    await knex.schema.createTable('eote_armor', (table) =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
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
        table.integer('owner');
        table.string('scope')
            .notNullable()
            .defaultTo('user');

        table.unique([ 'name', 'scope', 'owner' ]);
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

        table.unique([ 'name', 'scope', 'owner' ]);
    });

    //------------------------------------------------------------------------------------------------------------------
    // Step 3: Copy tables.
    //------------------------------------------------------------------------------------------------------------------

    const bk_genesys_motivation = await knex('bk_genesys_motivation').select();
    const bk_genesys_ability = await knex('bk_genesys_ability').select();
    const bk_genesys_talent = await knex('bk_genesys_talent').select();
    const bk_genesys_gear = await knex('bk_genesys_gear').select();
    const bk_genesys_attachment = await knex('bk_genesys_attachment').select();
    const bk_genesys_quality = await knex('bk_genesys_quality').select();
    const bk_genesys_armor = await knex('bk_genesys_armor').select();
    const bk_genesys_weapon = await knex('bk_genesys_weapon').select();
    const bk_eote_ability = await knex('bk_eote_ability').select();
    const bk_eote_talent = await knex('bk_eote_talent').select();
    const bk_eote_gear = await knex('bk_eote_gear').select();
    const bk_eote_attachment = await knex('bk_eote_attachment').select();
    const bk_eote_quality = await knex('bk_eote_quality').select();
    const bk_eote_armor = await knex('bk_eote_armor').select();
    const bk_eote_weapon = await knex('bk_eote_weapon').select();

    bk_genesys_motivation.length > 0 ? await knex('genesys_motivation').insert(bk_genesys_motivation) : undefined;
    bk_genesys_ability.length > 0 ? await knex('genesys_ability').insert(bk_genesys_ability) : undefined;
    bk_genesys_talent.length > 0 ? await knex('genesys_talent').insert(bk_genesys_talent) : undefined;
    bk_genesys_gear.length > 0 ? await knex('genesys_gear').insert(bk_genesys_gear) : undefined;
    bk_genesys_attachment.length > 0 ? await knex('genesys_attachment').insert(bk_genesys_attachment) : undefined;
    bk_genesys_quality.length > 0 ? await knex('genesys_quality').insert(bk_genesys_quality) : undefined;
    bk_genesys_armor.length > 0 ? await knex('genesys_armor').insert(bk_genesys_armor) : undefined;
    bk_genesys_weapon.length > 0 ? await knex('genesys_weapon').insert(bk_genesys_weapon) : undefined;
    bk_eote_ability.length > 0 ? await knex('eote_ability').insert(bk_eote_ability) : undefined;
    bk_eote_talent.length > 0 ? await knex('eote_talent').insert(bk_eote_talent) : undefined;
    bk_eote_gear.length > 0 ? await knex('eote_gear').insert(bk_eote_gear) : undefined;
    bk_eote_attachment.length > 0 ? await knex('eote_attachment').insert(bk_eote_attachment) : undefined;
    bk_eote_quality.length > 0 ? await knex('eote_quality').insert(bk_eote_quality) : undefined;
    bk_eote_armor.length > 0 ? await knex('eote_armor').insert(bk_eote_armor) : undefined;
    bk_eote_weapon.length > 0 ? await knex('eote_weapon').insert(bk_eote_weapon) : undefined;

    //------------------------------------------------------------------------------------------------------------------
    // Step 4: Delete bk_* tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.dropTable('bk_genesys_motivation');
    await knex.schema.dropTable('bk_genesys_ability');
    await knex.schema.dropTable('bk_genesys_talent');
    await knex.schema.dropTable('bk_genesys_gear');
    await knex.schema.dropTable('bk_genesys_attachment');
    await knex.schema.dropTable('bk_genesys_quality');
    await knex.schema.dropTable('bk_genesys_armor');
    await knex.schema.dropTable('bk_genesys_weapon');
    await knex.schema.dropTable('bk_eote_ability');
    await knex.schema.dropTable('bk_eote_talent');
    await knex.schema.dropTable('bk_eote_gear');
    await knex.schema.dropTable('bk_eote_attachment');
    await knex.schema.dropTable('bk_eote_quality');
    await knex.schema.dropTable('bk_eote_armor');
    await knex.schema.dropTable('bk_eote_weapon');

    //------------------------------------------------------------------------------------------------------------------
    // Step 5: Update scopes
    //------------------------------------------------------------------------------------------------------------------

    await knex('genesys_motivation').update({ scope: 'public' })
        .where({ official: true });
    await knex('genesys_ability').update({ scope: 'public' })
        .where({ official: true });
    await knex('genesys_talent').update({ scope: 'public' })
        .where({ official: true });
    await knex('genesys_gear').update({ scope: 'public' })
        .where({ official: true });
    await knex('genesys_attachment').update({ scope: 'public' })
        .where({ official: true });
    await knex('genesys_quality').update({ scope: 'public' })
        .where({ official: true });
    await knex('genesys_armor').update({ scope: 'public' })
        .where({ official: true });
    await knex('genesys_weapon').update({ scope: 'public' })
        .where({ official: true });
    await knex('eote_ability').update({ scope: 'public' })
        .where({ official: true });
    await knex('eote_talent').update({ scope: 'public' })
        .where({ official: true });
    await knex('eote_gear').update({ scope: 'public' })
        .where({ official: true });
    await knex('eote_attachment').update({ scope: 'public' })
        .where({ official: true });
    await knex('eote_quality').update({ scope: 'public' })
        .where({ official: true });
    await knex('eote_armor').update({ scope: 'public' })
        .where({ official: true });
    await knex('eote_weapon').update({ scope: 'public' })
        .where({ official: true });
}

//----------------------------------------------------------------------------------------------------------------------

export async function down(knex : Knex) : Promise<Knex.QueryBuilder>
{
    //------------------------------------------------------------------------------------------------------------------
    // Step 1: Rename tables.
    //------------------------------------------------------------------------------------------------------------------

    // Genesys Tables
    await knex.schema.renameTable('genesys_motivation', 'bk_genesys_motivation');
    await knex.schema.renameTable('genesys_ability', 'bk_genesys_ability');
    await knex.schema.renameTable('genesys_talent', 'bk_genesys_talent');
    await knex.schema.renameTable('genesys_gear', 'bk_genesys_gear');
    await knex.schema.renameTable('genesys_attachment', 'bk_genesys_attachment');
    await knex.schema.renameTable('genesys_quality', 'bk_genesys_quality');
    await knex.schema.renameTable('genesys_armor', 'bk_genesys_armor');
    await knex.schema.renameTable('genesys_weapon', 'bk_genesys_weapon');

    // EotE Tables
    await knex.schema.renameTable('eote_ability', 'bk_eote_ability');
    await knex.schema.renameTable('eote_talent', 'bk_eote_talent');
    await knex.schema.renameTable('eote_gear', 'bk_eote_gear');
    await knex.schema.renameTable('eote_attachment', 'bk_eote_attachment');
    await knex.schema.renameTable('eote_quality', 'bk_eote_quality');
    await knex.schema.renameTable('eote_armor', 'bk_eote_armor');
    await knex.schema.renameTable('eote_weapon', 'bk_eote_weapon');

    //------------------------------------------------------------------------------------------------------------------
    // Step 2: Declare new tables
    //------------------------------------------------------------------------------------------------------------------

    // Drop these two, since they're static, and it saves a lot of copy/paste
    await knex.schema.dropTable('genesys_reference');
    await knex.schema.dropTable('eote_reference');

    await eoteMigration.up(knex);

    //------------------------------------------------------------------------------------------------------------------
    // Step 3: Copy tables.
    //------------------------------------------------------------------------------------------------------------------

    const trimColumns = (rows) =>
    {
        return rows.map((obj) =>
        {
            delete obj.id;
            delete obj.scope;
            delete obj.owner;

            return obj;
        });
    };

    const bk_genesys_motivation = trimColumns(await knex('bk_genesys_motivation').select());
    const bk_genesys_ability = trimColumns(await knex('bk_genesys_ability').select());
    const bk_genesys_talent = trimColumns(await knex('bk_genesys_talent').select());
    const bk_genesys_gear = trimColumns(await knex('bk_genesys_gear').select());
    const bk_genesys_attachment = trimColumns(await knex('bk_genesys_attachment').select());
    const bk_genesys_quality = trimColumns(await knex('bk_genesys_quality').select());
    const bk_genesys_armor = trimColumns(await knex('bk_genesys_armor').select());
    const bk_genesys_weapon = trimColumns(await knex('bk_genesys_weapon').select());
    const bk_eote_ability = trimColumns(await knex('bk_eote_ability').select());
    const bk_eote_talent = trimColumns(await knex('bk_eote_talent').select());
    const bk_eote_gear = trimColumns(await knex('bk_eote_gear').select());
    const bk_eote_attachment = trimColumns(await knex('bk_eote_attachment').select());
    const bk_eote_quality = trimColumns(await knex('bk_eote_quality').select());
    const bk_eote_armor = trimColumns(await knex('bk_eote_armor').select());
    const bk_eote_weapon = trimColumns(await knex('bk_eote_weapon').select());

    bk_genesys_motivation.length > 0 ? await knex('genesys_motivation').insert(bk_genesys_motivation) : undefined;
    bk_genesys_ability.length > 0 ? await knex('genesys_ability').insert(bk_genesys_ability) : undefined;
    bk_genesys_talent.length > 0 ? await knex('genesys_talent').insert(bk_genesys_talent) : undefined;
    bk_genesys_gear.length > 0 ? await knex('genesys_gear').insert(bk_genesys_gear) : undefined;
    bk_genesys_attachment.length > 0 ? await knex('genesys_attachment').insert(bk_genesys_attachment) : undefined;
    bk_genesys_quality.length > 0 ? await knex('genesys_quality').insert(bk_genesys_quality) : undefined;
    bk_genesys_armor.length > 0 ? await knex('genesys_armor').insert(bk_genesys_armor) : undefined;
    bk_genesys_weapon.length > 0 ? await knex('genesys_weapon').insert(bk_genesys_weapon) : undefined;
    bk_eote_ability.length > 0 ? await knex('eote_ability').insert(bk_eote_ability) : undefined;
    bk_eote_talent.length > 0 ? await knex('eote_talent').insert(bk_eote_talent) : undefined;
    bk_eote_gear.length > 0 ? await knex('eote_gear').insert(bk_eote_gear) : undefined;
    bk_eote_attachment.length > 0 ? await knex('eote_attachment').insert(bk_eote_attachment) : undefined;
    bk_eote_quality.length > 0 ? await knex('eote_quality').insert(bk_eote_quality) : undefined;
    bk_eote_armor.length > 0 ? await knex('eote_armor').insert(bk_eote_armor) : undefined;
    bk_eote_weapon.length > 0 ? await knex('eote_weapon').insert(bk_eote_weapon) : undefined;

    //------------------------------------------------------------------------------------------------------------------
    // Step 4: Delete bk_* tables
    //------------------------------------------------------------------------------------------------------------------

    await knex.schema.dropTable('bk_genesys_motivation');
    await knex.schema.dropTable('bk_genesys_ability');
    await knex.schema.dropTable('bk_genesys_talent');
    await knex.schema.dropTable('bk_genesys_gear');
    await knex.schema.dropTable('bk_genesys_attachment');
    await knex.schema.dropTable('bk_genesys_quality');
    await knex.schema.dropTable('bk_genesys_armor');
    await knex.schema.dropTable('bk_genesys_weapon');
    await knex.schema.dropTable('bk_eote_ability');
    await knex.schema.dropTable('bk_eote_talent');
    await knex.schema.dropTable('bk_eote_gear');
    await knex.schema.dropTable('bk_eote_attachment');
    await knex.schema.dropTable('bk_eote_quality');
    await knex.schema.dropTable('bk_eote_armor');
    await knex.schema.dropTable('bk_eote_weapon');
}

//----------------------------------------------------------------------------------------------------------------------
