import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { userInfoReducer } from "./userInfo/user-info.reducer";
import { userDetailsReducer } from "./user-details/user-details.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    userInfo: userInfoReducer,
    userDetails: userDetailsReducer
})