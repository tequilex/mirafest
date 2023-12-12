import { createSelector } from "reselect";

export const selectCheckedReducer = (state) => state.checkedCategories;

export const selectCheckedCategories = createSelector(
    [selectCheckedReducer],
    (categories) => categories.checkedCategories 
)

export const selectCheckedTotal = createSelector(
    [selectCheckedCategories],
    (categories) => categories.reduce((total, item) => total + item.price, 0)
)
