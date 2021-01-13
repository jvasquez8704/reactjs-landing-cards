import { types } from '../constants/types';

const initialState = {
    cardTypes : [{ product: '3001', mask: 'Crédito' }, { product: '3002', mask: 'Débito' }],
    queryTypes : [{ product: '3003', mask: 'Consulta A' }, { product: '3004', mask: 'Consulta B' }],
    reasonBlock : [{ product: '3005', mask: 'Robo' }, { product: '3006', mask: 'Perdida' }],
    reasonUpdateLimit : [{ product: '3007', mask: 'Aumento' }, { product: '3008', mask: 'Disminución' }]
}

export const achReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.getUserInfo:
            return {
                ...state,
                ...action.payload
            }
        case types.getAgreement:
            return {
                ...state,
                detail: action.payload
            }
        case types.setAccount:
            return {
                ...state,
                selectedAccount: action.payload
            }
        case types.getEnrolment:
            return {
                ...state,
                aproved: action.payload
            }
        default:
            return state;
    }

}