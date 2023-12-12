import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { userInfoReducer } from "./userInfo/user-info.reducer";
import { userDetailsReducer } from "./user-details/user-details.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { checkedCategoriesReducer } from "./checked-categories/checked-categories.reducer";
import { packagesReducer } from "./packages/packages.reducer";
import { billingReducer } from "./billing/billing.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    userInfo: userInfoReducer,
    userDetails: userDetailsReducer,
    categories: categoriesReducer,
    checkedCategories: checkedCategoriesReducer,
    packages: packagesReducer,
    billingInfo: billingReducer
})