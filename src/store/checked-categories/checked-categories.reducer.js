const INITIAL_STATE = {
    checkedCategories: []
}

export const checkedCategoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case "SET_CHECKED_CATEGORIES":
            return {
                ...state,
                checkedCategories: payload
            }

        default:
            return state;
    }
}