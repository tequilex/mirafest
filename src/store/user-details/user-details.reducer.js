import { USER_DETAILS_ACTION_TYPES } from "./user-details.types"

const INITIAL_STATE = {
    userDetails: [],
}

export const userDetailsReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_DETAILS_ACTION_TYPES.SET_USER_DETAILS:
            return {
                ...state,
                userDetails: payload
            }
        default:
            return state;
    }
}