import { createAction } from '../../utils/reducer/reducer.utils';
import { PACKAGES_ACTION_TYPES } from './packages.types';

export const setPackages = (packages) => createAction(PACKAGES_ACTION_TYPES.SET_PACKAGES, packages);