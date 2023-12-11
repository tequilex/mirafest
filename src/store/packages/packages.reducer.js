import { PACKAGES_ACTION_TYPES } from './packages.types';

const INITIAL_STATE = {
    packages: []
}

export const packagesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case PACKAGES_ACTION_TYPES.SET_PACKAGES:
            return {
                ...state,
                packages: payload
            }

        default:
            return state;
    }
}