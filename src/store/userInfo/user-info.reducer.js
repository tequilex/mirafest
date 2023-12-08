import { USER_INFO_ACTION_TYPES } from './user-info.types';

const INITIAL_STATE = {
    userInfo: {},
}

export const userInfoReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_INFO_ACTION_TYPES.SET_USER_INFO:
            return {
                ...state,
                userInfo: payload
            }

        default:
            return state;
    }
}