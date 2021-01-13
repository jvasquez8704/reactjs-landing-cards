import { unsecurefetch } from '../helpers/fetch';
import { types } from '../constants/types';
import { requests } from '../constants/requests';
import { updateStep , setError, unsetError, setLoading } from './ui';

export const resetUserPassword = (identity, username, token, email, telephone) => {
    return async( dispatch ) => {

        let { unlockUser : req } = requests;
        req.request.header.transaction = 2003;
        req.request.header.step = 2;
        
        req.request.data.id = identity;
        req.request.data.user = username;
        req.request.data.otp = token;
        req.request.data.email = email;
        req.request.data.phone = telephone;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('ChangePasswordOCB', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                dispatch(resetPassword(data));
                dispatch(updateStep(2));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}


const resetPassword = ( user ) => ({
    type: types.resetPassword,
    payload: user
});