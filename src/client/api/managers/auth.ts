//----------------------------------------------------------------------------------------------------------------------
// AuthManager
//----------------------------------------------------------------------------------------------------------------------

import { BehaviorSubject, Observable } from 'rxjs';

// Models
import AccountModel from '../models/account';

// Resource Access
import authRA from '../resource-access/auth';

//----------------------------------------------------------------------------------------------------------------------

declare global {
    interface Window {
        gapi : any;
        onGoogleInit : () => void;
        onGoogleSignIn : (googleUser : any) => void;
        onGoogleFailure : (error : Error) => void;
    }
}

//----------------------------------------------------------------------------------------------------------------------

class AuthManager
{
    #accountSubject : BehaviorSubject<AccountModel | undefined>;
    #statusSubject : BehaviorSubject<string>;

    auth2 : any;
    loading : Promise<void>;

    constructor()
    {
        // Subjects
        this.#accountSubject = new BehaviorSubject<AccountModel | undefined>(undefined);
        this.#statusSubject = new BehaviorSubject('unknown');

        // We have to expose this to window for Google to pick it up.
        window.onGoogleInit = this._onGoogleInit.bind(this);
        window.onGoogleSignIn = this._onGoogleSignIn.bind(this);
        window.onGoogleFailure = this._onGoogleFailure.bind(this);

        this.loading = new Promise((resolve) =>
        {
            const subscription = this.status$.subscribe((status) =>
            {
                if(status === 'gapi loaded')
                {
                    resolve();
                    subscription.unsubscribe();
                } // end if
            });
        });
    } // end constructor

    //------------------------------------------------------------------------------------------------------------------
    // Observables
    //------------------------------------------------------------------------------------------------------------------

    get account$() : Observable<AccountModel | undefined> { return this.#accountSubject.asObservable(); }
    get status$() : Observable<string> { return this.#statusSubject.asObservable(); }

    //------------------------------------------------------------------------------------------------------------------
    // Properties
    //------------------------------------------------------------------------------------------------------------------

    get account() : AccountModel | undefined { return this.#accountSubject.getValue(); }
    get status() : string { return this.#statusSubject.getValue(); }

    //------------------------------------------------------------------------------------------------------------------
    // Events
    //------------------------------------------------------------------------------------------------------------------

    _onGoogleInit() : void
    {
        window.gapi.load('auth2', () =>
        {
            window.gapi.auth2.init();
            this.auth2 = window.gapi.auth2.getAuthInstance();

            // Update our status
            this.#statusSubject.next('gapi loaded');

            // We listen for the current user to change
            this.auth2.currentUser.listen((googleUser) =>
            {
                if(googleUser.isSignedIn())
                {
                    this._onGoogleSignIn(googleUser);
                }
                else
                {
                    this.#accountSubject.next(undefined);
                    this.#statusSubject.next('signed out');
                } // end if
            });
        });
    } // end _onGoogleInit

    _onGoogleSignIn(googleUser) : void
    {
        this.$completeSignIn(googleUser.getAuthResponse().id_token);
    } // end _onGoogleSignIn

    _onGoogleFailure(error : Error) : void
    {
        console.warn('Google Sign In failure:', error);
    } // end _onGoogleFailure

    $completeSignIn(idToken : string) : Promise<void>
    {
        this.#statusSubject.next('signing in');
        return authRA.completeSignIn(idToken)
            .then((account) =>
            {
                this.#accountSubject.next(account);
                this.#statusSubject.next('signed in');
            })
            .catch((error) =>
            {
                console.error('Failed to complete sign in:', error);
                this.#statusSubject.next('signed out');
            });
    } // end $completeSignIn

    //------------------------------------------------------------------------------------------------------------------
    // Public
    //------------------------------------------------------------------------------------------------------------------

    attachSignIn(elem : HTMLElement) : Promise<void>
    {
        return this.loading
            .then(() =>
            {
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                this.auth2.attachClickHandler(elem, {}, () => {}, this._onGoogleFailure.bind(this));
            });
    } // end attachSignIn

    signOut() : void
    {
        this.auth2.signOut();
    } // end signOut

    //------------------------------------------------------------------------------------------------------------------
    // API
    //------------------------------------------------------------------------------------------------------------------

    async saveAccount(account) : Promise<AccountModel>
    {
        return authRA.save(account);
    } // end saveAccount
} // end AuthManager

//----------------------------------------------------------------------------------------------------------------------

export default new AuthManager();

//----------------------------------------------------------------------------------------------------------------------
