//----------------------------------------------------------------------------------------------------------------------
// Set us up a default role
//----------------------------------------------------------------------------------------------------------------------

exports.seed = async(knex) =>
{
    // Delete automatic roles
    await knex('role').del()
        .whereIn('role_id', [ 1, 2 ]);

    // Add Automatic Roles
    await knex('role')
        .insert([
            { role_id: 1, name: 'Admins', permissions: JSON.stringify([ '*/*' ]) },
            { role_id: 2, name: 'Global Mods', permissions: JSON.stringify([ '*/canModifyContent', '*/canDeleteContent' ]) }
        ]);

    // Check for admin records, and add them if they're not already there.
    const admins = [
        {
            account_id: 1,
            hash_id: '3VAAgA',
            email: 'chris.case@g33xnexus.com',
            name: 'Morgul',
            avatar: 'https://lh3.googleusercontent.com/-r8fmbWdlFvg/AAAAAAAAAAI/AAAAAAAAA9g/oWyh8pnmDSY/s96-c/photo.jpg?sz=512',
            permissions: '["*/*"]',
            settings: '{}',
            created: knex.fn.now()
        },
        {
            account_id: 2,
            hash_id: '3VzoXi',
            email: 'null23544@gmail.com',
            name: 'Lord Null',
            avatar: 'https://lh6.googleusercontent.com/-uCa4jsA-_i0/AAAAAAAAAAI/AAAAAAAAAB4/chnr3xPv3_c/s96-c/photo.jpg?sz=512',
            permissions: '[]',
            settings: '{}',
            created: knex.fn.now()
        }
    ];

    const mods = [
        {
            account_id: 3,
            hash_id: '3Ks11R',
            email: 'travis.a.odom@gmail.com',
            name: 'Burstaholic',
            avatar: 'https://lh6.googleusercontent.com/-Cm7eBAJV2gQ/AAAAAAAAAAI/AAAAAAAAAXE/KLFM6YmcWm8/s96-c/photo.jpg?sz=512',
            permissions: '[]',
            settings: '{}',
            created: knex.fn.now()

        }
    ];

    /* eslint-disable no-await-in-loop */

    // Do a `mapSeries` over admins, and add them and their `account_role entry`, if needed.
    for(const account of admins)
    {
        const exists = (await knex('account').select()
            .where({ account_id: account.account_id })).length > 0;
        if(!exists)
        {
            await knex('account').insert(account);
        } // end if

        const linkExists = (await knex('account_role').select()
            .where({ account_id: account.account_id, role_id: 1 })).length > 0;
        if(!linkExists)
        {
            await knex('account_role').insert({ account_id: account.account_id, role_id: 1 });
        } // end if
    } // end for

    // Do a `mapSeries` over mods, and add them and their `account_role entry`, if needed.
    for(const account of mods)
    {
        const exists = (await knex('account').select()
            .where({ account_id: account.account_id })).length > 0;
        if(!exists)
        {
            await knex('account').insert(account);
        } // end if

        const linkExists = (await knex('account_role').select()
            .where({ account_id: account.account_id, role_id: 2 })).length > 0;
        if(!linkExists)
        {
            await knex('account_role').insert({ account_id: account.account_id, role_id: 2 });
        } // end if
    } // end for

    /* eslint-enable no-await-in-loop */
};

//----------------------------------------------------------------------------------------------------------------------
