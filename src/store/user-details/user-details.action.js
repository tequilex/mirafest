import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_DETAILS_ACTION_TYPES } from "./user-details.types";

export const setUserDetails = (userDetails) => createAction(USER_DETAILS_ACTION_TYPES.SET_USER_DETAILS, userDetails)