import { BILLING_ACTION_TYPES } from './billing.types';

const INITIAL_STATE = {
    billingInfo: null
}

export const billingReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case BILLING_ACTION_TYPES.SET_BILLING:
            return {
                ...state,
                billingInfo: payload
            }

        default:
            return state;
    }
}