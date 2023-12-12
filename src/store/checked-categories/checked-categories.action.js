import { createAction } from '../../utils/reducer/reducer.utils';
import { CHECKED_CATEGORIES_ACTION_TYPES } from './checked-categories.types';

// export const setCheckedCategories = (checkedCategories) => createAction(CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES, checkedCategories)

const addChecked = (checkedMap, checkedToAdd, checked, title) => {
    const existingChecked = checkedMap.find((checkedItem) => checkedItem.id === checkedToAdd.id);

    if (existingChecked) {
        if (checked) {
            return checkedMap.map((checkedItem) =>
                checkedItem.id === checkedToAdd.id ? { ...checkedItem, isChecked: checked } : checkedItem
            )
        } else {
            return checkedMap.filter((checkedItem) => checkedItem.id !== checkedToAdd.id);
        }
    }


    return [...checkedMap, { ...checkedToAdd, isChecked: checked, title: title }];


}

export const setCheckedCategories = (checkedCategories, checkedToAdd, checked, title) => {
    const newCheckedCategories = addChecked(checkedCategories, checkedToAdd, checked, title)
    return createAction(CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES, newCheckedCategories)
}

export const setCheckedCategoriesMap = (checkedMap) => createAction(CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES, checkedMap)

// export const setCheckedCategories = (checkedToAdd) => createAction(CHECKED_CATEGORIES_ACTION_TYPES.SET_CHECKED_CATEGORIES, checkedToAdd)