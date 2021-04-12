//----------------------------------------------------------------------------------------------------------------------
/// RollsService
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import Vue from 'vue';
import diceSvc from '../../../../client/components/dice/diceService';

//----------------------------------------------------------------------------------------------------------------------

class RollsService 
{
    constructor()
    {
        this.state = {
            results: []
        };
    } // end constructor
    
    clearResults()
    {
        Vue.set(this.state, 'results', []);
    } // end clearResults
    
    roll(rollText, scope, title)
    {
        const roll = diceSvc.roll(rollText, scope);
        
        this.state.results.unshift({
            title,
            roll: {
                value: roll.value,
                text: roll.render()
            }
        });
    } // end roll
} // end RollsService

//----------------------------------------------------------------------------------------------------------------------

export default new RollsService();

//----------------------------------------------------------------------------------------------------------------------
