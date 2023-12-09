import { CHECKED_CATEGORIES_ACTION_TYPES } from './checked-categories.types'

const INITIAL_STATE = {
    checkedCategories: []
}

export const checkedCategoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES:
            return {
                ...state,
                checkedCategories: payload
            }

        default:
            return state;
    }
}