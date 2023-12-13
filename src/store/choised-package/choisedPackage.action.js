import { createAction } from "../../utils/reducer/reducer.utils";
import { CHOISED_PACKAGE_ACTION_TYPES } from "./choisedPackage.types";

export const setChoisedPackage = (choisedPackage) => createAction(CHOISED_PACKAGE_ACTION_TYPES.SET_CHOISED_PACKAGE, choisedPackage)