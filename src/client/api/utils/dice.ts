//----------------------------------------------------------------------------------------------------------------------
// DiceUtil
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import LRU from 'lru-cache';
import rpgdice, { Expression } from 'rpgdicejs';

// Dice Systems
import { fudgeChoices } from './dice-systems/fudge';
import {
    eoteChoices,
    eoteDiceSortOrder,
    eoteResultsSortOrder,
    criticals,
    cancelEotEResults,
    findCritical
} from './dice-systems/eote';

// Interfaces
import { EoteCritical } from '../../../common/interfaces/systems/eote';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Rolls a random die, of the given sides.
 *
 * @param [sides=1] - The number of sides of the die to roll.
 *
 * @returns Returns a random number.
 */
function randomDieRoll(sides = 1) : number
{
    return Math.floor(Math.random() * sides);
} // end randomDieRoll

/**
 * Chooses an item form a list at random.
 *
 * @param choices - The list to choose an item out of.
 *
 * @returns Returns an item from the list, randomly chosen.
 */
function randomChoice<T>(choices : T[]) : T
{
    return choices[randomDieRoll(choices.length)];
} // end randomChoice

//----------------------------------------------------------------------------------------------------------------------

class DiceUtil
{
    #cache : LRU;

    public eoteDiceSortOrder : typeof eoteDiceSortOrder;
    public eoteCriticals : EoteCritical[];

    constructor()
    {
        this.#cache = new LRU(50);

        // Useful properties
        this.eoteDiceSortOrder = eoteDiceSortOrder;
        this.eoteCriticals = criticals;
    } // end constructor

    roll(rollTxt : string, scope : Record<string, unknown>) : string
    {
        // We cache the expression objects, since they're costly to create, and can be evaluated multiple times.
        let expr = this.#cache.get(rollTxt);
        if(!expr)
        {
            expr = rpgdice.parse(rollTxt);
            this.#cache.set(rollTxt, expr);
        } // end if

        return expr.eval(scope);
    } // end roll

    rollFudge(bonus = 0) : Expression
    {
        const results = _.map(_.range(4), () =>
        {
            return randomChoice(fudgeChoices);
        });

        const rollTotal = _.reduce(results, (total, rollResult) =>
        {
            return total + parseInt(rollResult as string);
        }, 0);

        return {
            render: () =>
            {
                return `[ ${ results.join(', ') } ] + ${ bonus }`;
            },
            value: rollTotal + bonus
        };
    } // end rollFudge

    // We assume dice is in the form of `{ ability: 3, difficulty: 1, setback: 0, ... }`.
    rollEotE(dice : Record<string, number>) : { full : string[], uncancelled : string[] }
    {
        const results = _.mapValues(dice, (count : number, die : string) =>
        {
            return _.reduce(_.range(count), (dieResults) =>
            {
                return dieResults.concat(randomChoice(eoteChoices[die]));
            }, []);
        });

        // We concat all the sub results together, and sort them.
        const sorted = _.chain(eoteDiceSortOrder)
            .reduce((accum, die) => accum.concat(results[die]), [])
            .compact()
            .sortBy((dieResult) => eoteResultsSortOrder.indexOf(dieResult))
            .value();

        return {
            full: sorted,
            uncancelled: cancelEotEResults(sorted)
        };
    } // end rollEotE

    rollEotECritical(bonus = 0) : EoteCritical | undefined
    {
        const roll = randomDieRoll(100) + bonus;
        return findCritical(roll);
    } // end rollEotECritical
} // end DiceUtil

//----------------------------------------------------------------------------------------------------------------------

export default new DiceUtil();

//----------------------------------------------------------------------------------------------------------------------
