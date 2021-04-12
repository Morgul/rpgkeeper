//----------------------------------------------------------------------------------------------------------------------
// AuthResourceAccess
//----------------------------------------------------------------------------------------------------------------------

import $http from 'axios';

// Models
import AccountModel from '../models/account';

//----------------------------------------------------------------------------------------------------------------------

class AuthResourceAccess
{
    completeSignIn(idToken : string) : Promise<AccountModel>
    {
        return $http.post('/auth/google', { idToken })
            .then(({ data }) => new AccountModel(data));
    } // end completeSignIn

    async save(account : AccountModel) : Promise<AccountModel>
    {
        const { data } = await $http.patch(`/accounts/${ account.id }`, account);
        account.update(data);

        return account;
    }
} // end AuthResourceAccess

//----------------------------------------------------------------------------------------------------------------------

export default new AuthResourceAccess();

//----------------------------------------------------------------------------------------------------------------------
