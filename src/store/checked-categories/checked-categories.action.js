import { createAction } from '../../utils/reducer/reducer.utils';
import { CHECKED_CATEGORIES_ACTION_TYPES } from './checked-categories.types';

// export const setCheckedCategories = (checkedCategories) => createAction(CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES, checkedCategories)

const addChecked = (checkedMap, checkedToAdd, checked) => {
    const existingChecked = checkedMap.find((checkedItem) => checkedItem.id === checkedToAdd.id);

    console.log(existingChecked);


    if (existingChecked) {
        if (checked) {
            return checkedMap.map((checkedItem) =>
                checkedItem.id === checkedToAdd.id ? { ...checkedItem, isChecked: checked } : checkedItem
            )
        } else {
            return checkedMap.filter((checkedItem) => checkedItem.id !== checkedToAdd.id);
        }
    }

    return [...checkedMap, { ...checkedToAdd, isChecked: checked }];

}

export const setCheckedCategories = (checkedCategories, checkedToAdd, checked) => {
    const newCheckedCategories = addChecked(checkedCategories, checkedToAdd, checked)
    return createAction(CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES, newCheckedCategories)
}

// export const setCheckedCategories = (checkedToAdd) => createAction(CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES, checkedToAdd)