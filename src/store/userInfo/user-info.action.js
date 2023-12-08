import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_INFO_ACTION_TYPES } from "./user-info.types";

export const setUserInfo = (userInfo) => createAction(USER_INFO_ACTION_TYPES.SET_USER_INFO, userInfo)