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



// export const selectCheckedToAdd = createSelector(
//     [selectCheckedCategories],
//     (categories) => categories.some((el) => el.id === categories.id)
// )
