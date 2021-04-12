//----------------------------------------------------------------------------------------------------------------------
// SystemsManager
//----------------------------------------------------------------------------------------------------------------------

import { BehaviorSubject, Observable } from 'rxjs';

// Interfaces
import { System } from '../../../common/interfaces/common';

// Resource Access
import systemsRA from '../resource-access/systems';

//----------------------------------------------------------------------------------------------------------------------

class SystemsManager
{
    #systemsSubject : BehaviorSubject<System<any>[]>;
    #statusSubject : BehaviorSubject<string>;

    loading : Promise<void>;

    constructor()
    {
        // Subjects
        this.#systemsSubject = new BehaviorSubject([] as System<any>[]);
        this.#statusSubject = new BehaviorSubject('loading');

        // Load up our systems
        this.loading = systemsRA.loadSystems()
            .then((systems) =>
            {
                this.#systemsSubject.next(systems);
                this.#statusSubject.next('loaded');
            });
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Observables
    //------------------------------------------------------------------------------------------------------------------

    get systems$() : Observable<System<any>[]> { return this.#systemsSubject.asObservable(); }
    get status$() : Observable<string> { return this.#statusSubject.asObservable(); }

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get systems() : System<any>[] { return this.#systemsSubject.getValue(); }
    get status() : string { return this.#statusSubject.getValue(); }

    //------------------------------------------------------------------------------------------------------------------
    // Public API
    //------------------------------------------------------------------------------------------------------------------

    async getSystem(systemID) : Promise<System<any> | undefined>
    {
        await this.loading;
        return this.systems.find((system) => system.id === systemID);
    } // end getSystem

    getStatusDisplay(desc : string) : string
    {
        switch (desc)
        {
            case 'dev':
                return 'Early Development';

            case 'beta':
                return 'Public Beta';

            case 'disabled':
                return 'Disabled';

            default:
                return desc;
        } // end switch
    } // end getStatusDisplay

    getStatusDescription(desc : string) : string
    {
        switch (desc)
        {
            case 'dev':
                return 'This system is incomplete and likely to have frequent changes.';

            case 'beta':
                return 'This system is mostly complete and considered reasonably stable, but not bug free.';

            case 'disabled':
                return 'This system is disabled for normal users. USE AT YOUR OWN RISK.';

            default:
                return 'Unknown status.';
        } // end switch
    } // end getStatusDescription
} // end SystemsManager

//----------------------------------------------------------------------------------------------------------------------

export default new SystemsManager();

//----------------------------------------------------------------------------------------------------------------------
