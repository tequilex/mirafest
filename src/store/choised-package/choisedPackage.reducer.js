import { CHOISED_PACKAGE_ACTION_TYPES } from "./choisedPackage.types";

const INITIAL_STATE = {
    choisedPackage: 0
}

export const choisedPackageReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CHOISED_PACKAGE_ACTION_TYPES.SET_CHOISED_PACKAGE:
            return {
                ...state,
                choisedPackage: payload
            }

        default:
            return state;
    }
}