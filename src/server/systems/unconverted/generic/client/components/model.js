//----------------------------------------------------------------------------------------------------------------------
/// GenericCharacter
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import rpgdice from 'rpgdicejs';

import BaseSystemCharacterModel from '../../../../client/components/character/BaseSystemCharacterModel';

//----------------------------------------------------------------------------------------------------------------------

class GenericCharacter extends BaseSystemCharacterModel 
{
    constructor(base, system)
    {
        super(base, system);
    } // end constructor

    // System Character
    get counters() { return this._system.counters; }
    get rolls() { return this._system.rolls; }
    get stats() { return this._system.stats; }
    get notes() { return this._system.notes; }

    get rollContext()
    {
        const context = {};

        _.each(this._system.stats, (block) =>
        {
            context[block.name] = {};
            if(block.type == 'table')
            {
                const pkIdx = _.findIndex(block.columns, { pk: true }) || 0;

                _.each(block.rows, (row) =>
                {
                    const pk = row[pkIdx];
                    const subObj = {};
                    _.each(block.columns, (col, index) =>
                    {
                        if(!col.pk)
                        {
                            // Handle computed properties
                            if(col.type === 'computed')
                            {
                                Object.defineProperty(subObj, col.name, {
                                    get() { return rpgdice.eval(row[index], context).value; }
                                });
                            }
                            else
                            {
                                subObj[col.name] = row[index];
                            } // end if
                        } // end if
                    });

                    context[block.name][pk] = subObj;
                });
            } // end if

            if(block.type == 'list')
            {
                _.each(block.items, (item) =>
                {
                    // Handle computed properties
                    if(item.type === 'computed')
                    {
                        Object.defineProperty(context[block.name], item.key, {
                            get() { return rpgdice.eval(item.value, context).value; }
                        });
                    }
                    else
                    {
                        context[block.name][item.key] = item.value;
                    } // end if
                });
            } // end if
        });

        return context;
    } // end rollContext

    _ensureValidity()
    {
        super._ensureValidity();
        
        if(!_.isArray(this._system.counters))
        {
            this._system.counters = [];
        } // end if

        if(!_.isArray(this._system.rolls))
        {
            this._system.rolls = [];
        } // end if
    } // end _ensureValidity

    _move(array, from, to)
    {
        array.splice(to, 0, array.splice(from, 1)[0]);
    } // end _move

    moveUp(listName, item)
    {
        const list = this._system[listName];

        if(_.isArray(list))
        {
            const from = list.indexOf(item);
            const to = Math.max(from - 1, 0);

            this._move(list, from, to);
            this.save();
        } // end if
    } // end moveUp

    moveDown(listName, item)
    {
        const list = this._system[listName];

        if(_.isArray(list))
        {
            const from = list.indexOf(item);
            const to = Math.min(from + 1, (list.length - 1));

            this._move(list, from, to);
            this.save();
        } // end if
    } // end moveDown
} // end GenericCharacter

//----------------------------------------------------------------------------------------------------------------------

export default GenericCharacter;

//----------------------------------------------------------------------------------------------------------------------
