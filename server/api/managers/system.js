//----------------------------------------------------------------------------------------------------------------------
// SystemManager
//----------------------------------------------------------------------------------------------------------------------

const _ = require('lodash');

// Systems
const Risus = require('../../systems/risus/system');
const Fate = require('../../systems/fate/system');
const Wfrp = require('../../systems/wfrp/system');
const { Genesys, EdgeOfTheEmpire } = require('../../systems/eote/system');
const GenericRPGExperiment = require('../../systems/generic-experiment/system');

//----------------------------------------------------------------------------------------------------------------------

class SystemManager
{
    constructor()
    {
        this.systems = [
            Risus,
            Fate,
            Genesys,
            EdgeOfTheEmpire,
            Wfrp,
            GenericRPGExperiment
        ];

        _.each(this.systems, (system) => system.init(this));
    } // end constructor

    get(id)
    {
        return _.find(this.systems, { id });
    } // end get
} // end SystemManager

//----------------------------------------------------------------------------------------------------------------------

module.exports = new SystemManager();

//----------------------------------------------------------------------------------------------------------------------
