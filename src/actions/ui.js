import { types } from '../constants/types';

export const updateStep = step => ({
    type: types.updateStep,
    payload: step
});

export const setError = err => ({
    type: types.setError,
    payload: err
});

export const unsetError = () => ({
    type: types.unsetError
});

export const setLoading = () => ({
    type: types.setLoading
});

export const setTab = tab => ({
    type: types.setTab,
    payload: tab
});