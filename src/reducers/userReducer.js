import { types } from '../constants/types';

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case types.resetPassword:

            return {
                ...action.payload
            }

        default:
            return state;
    }

} 