//----------------------------------------------------------------------------------------------------------------------
// EotEManager
//----------------------------------------------------------------------------------------------------------------------

import {BehaviorSubject, Observable} from 'rxjs';

// Interfaces
import { Supplement } from '../../../common/interfaces/common';

// Managers
import charMan from './character';
import suppMan from './supplement';

//----------------------------------------------------------------------------------------------------------------------

class EotEManager
{
    #modeSubject : BehaviorSubject<string> = new BehaviorSubject('eote');
    #abilitiesSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #armorSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #attachmentSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #gearSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #qualitiesSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #talentsSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #weaponsSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #referencesSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #forcePowersSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);
    #motivationsSubject : BehaviorSubject<Supplement[]> = new BehaviorSubject([] as Supplement[]);

    /* eslint-disable id-length */
    readonly rangeEnum = {
        en: 'Engaged',
        s: 'Short',
        m: 'Medium',
        l: 'Long',
        ex: 'Extreme'
    };

    readonly activationEnum = {
        p: 'Passive',
        ai: 'Active (Incidental)',
        aio: 'Active (Incidental, Out of Turn)',
        am: 'Active (Maneuver)',
        aa: 'Active (Action)'
    };
    /* eslint-enable id-length */

    constructor()
    {
        // Subscriptions
        charMan.selected$.subscribe(this._onCharacterChanged.bind(this));
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Observables
    //------------------------------------------------------------------------------------------------------------------

    get mode$() : Observable<string> { return this.#modeSubject.asObservable(); }

    // Common
    get abilities$() : Observable<Supplement[]> { return this.#abilitiesSubject.asObservable(); }
    get armor$() : Observable<Supplement[]> { return this.#armorSubject.asObservable(); }
    get attachment$() : Observable<Supplement[]> { return this.#attachmentSubject.asObservable(); }
    get gear$() : Observable<Supplement[]> { return this.#gearSubject.asObservable(); }
    get qualities$() : Observable<Supplement[]> { return this.#qualitiesSubject.asObservable(); }
    get talents$() : Observable<Supplement[]> { return this.#talentsSubject.asObservable(); }
    get weapons$() : Observable<Supplement[]> { return this.#weaponsSubject.asObservable(); }
    get references$() : Observable<Supplement[]> { return this.#referencesSubject.asObservable(); }

    // EotE Specific
    get forcePowers$() : Observable<Supplement[]> { return this.#forcePowersSubject.asObservable(); }

    // Genesys Specific
    get motivations$() : Observable<Supplement[]> { return this.#motivationsSubject.asObservable(); }

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get mode() : string { return this.#modeSubject.getValue(); }
    get abilities() : Supplement[] { return this.#abilitiesSubject.getValue(); }
    get armor() : Supplement[] { return this.#armorSubject.getValue(); }
    get attachment() : Supplement[] { return this.#attachmentSubject.getValue(); }
    get gear() : Supplement[] { return this.#gearSubject.getValue(); }
    get qualities() : Supplement[] { return this.#qualitiesSubject.getValue(); }
    get talents() : Supplement[] { return this.#talentsSubject.getValue(); }
    get weapons() : Supplement[] { return this.#weaponsSubject.getValue(); }
    get references() : Supplement[] { return this.#referencesSubject.getValue(); }

    // EotE Specific
    get forcePowers() : Supplement[] { return this.#forcePowersSubject.getValue(); }

    // Genesys Specific
    get motivations() : Supplement[] { return this.#motivationsSubject.getValue(); }

    //------------------------------------------------------------------------------------------------------------------
    // Subscriptions
    //------------------------------------------------------------------------------------------------------------------

    async _onCharacterChanged(character) : Promise<void>
    {
        if(character && [ 'eote', 'genesys' ].includes(character.system))
        {
            this.#modeSubject.next(character.system);

            // Fetch Common subjects
            this.#abilitiesSubject.next(await suppMan.list('abilities'));
            this.#armorSubject.next(await suppMan.list('armor'));
            this.#attachmentSubject.next(await suppMan.list('attachments'));
            this.#gearSubject.next(await suppMan.list('gear'));
            this.#qualitiesSubject.next(await suppMan.list('qualities'));
            this.#talentsSubject.next(await suppMan.list('talents'));
            this.#weaponsSubject.next(await suppMan.list('weapons'));
            this.#referencesSubject.next(await suppMan.list('references'));

            // EotE Specific supplements
            if(this.mode === 'eote')
            {
                this.#forcePowersSubject.next(await suppMan.list('forcepowers'));
            } // end if

            // Genesys Specific supplements
            if(this.mode === 'genesys')
            {
                this.#motivationsSubject.next(await suppMan.list('motivations'));
            } // end if
        }
        else
        {
            this.#modeSubject.next('eote');
            this.#abilitiesSubject.next([]);
            this.#armorSubject.next([]);
            this.#attachmentSubject.next([]);
            this.#gearSubject.next([]);
            this.#qualitiesSubject.next([]);
            this.#talentsSubject.next([]);
            this.#weaponsSubject.next([]);
            this.#referencesSubject.next([]);
            this.#forcePowersSubject.next([]);
            this.#motivationsSubject.next([]);
        } // end if
    } // end _onCharacterChanged

    //------------------------------------------------------------------------------------------------------------------
    // Public API
    //------------------------------------------------------------------------------------------------------------------

    async addSup(type : string, supp : Supplement) : Promise<Supplement>
    {
        const newSupp = await suppMan.add(type, supp);

        // Update subject, and compact falsey values
        const supplements = [ newSupp ].concat(this[type]).filter((item) => !!item);
        this[`_${ type }Subject`].next(supplements);

        return newSupp;
    } // end addSup

    async editSup(type : string, supp : Supplement) : Promise<Supplement>
    {
        const newSupp = await suppMan.update(type, supp);

        // Update subject
        const supplements = this[type].filter((item) => item.id !== supp.id).concat([ newSupp ]);
        this[`_${ type }Subject`].next(supplements);

        return newSupp;
    } // end editSup

    async delSup(type : string, supp : Supplement) : Promise<void>
    {
        await suppMan.delete(type, supp.id);

        // Update subject, and compact falsey values
        const supplements = this[type].filter((item) => item.id !== supp.id);
        this[`_${ type }Subject`].next(supplements);
    } // end delSup
} // end EotEManager

//----------------------------------------------------------------------------------------------------------------------

export default new EotEManager();

//----------------------------------------------------------------------------------------------------------------------
