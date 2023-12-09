import { createAction } from '../../utils/reducer/reducer.utils';
import { CHECKED_CATEGORIES_ACTION_TYPES } from './checked-categories.types';

export const setCheckedCategories = (checkedCategories) => createAction(CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES, checkedCategories)