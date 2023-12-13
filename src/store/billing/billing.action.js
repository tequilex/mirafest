import { createAction } from "../../utils/reducer/reducer.utils"
import { BILLING_ACTION_TYPES } from "./billing.types"

const totalBilling = (checkedCategories, choisedPackage) => {
    const { price: sumPackage } = choisedPackage;

    // Создаем копию exist, чтобы отслеживать использованные категории
    const existCopy = choisedPackage.exist.map(obj => ({ ...obj }));

    // Рассчитываем стоимость выбранных категорий, учитывая лимиты из exist
    const price = checkedCategories.reduce((summ, curr) => {
        const existEntry = existCopy.find(entry => Object.keys(entry)[0] === curr.title);

        if (existEntry) {
            const title = Object.keys(existEntry)[0];
            if (existEntry[title] > 0) {
                existEntry[title] -= 1; // Уменьшаем количество доступных использований
                return summ; // Не добавляем стоимость, так как категория уже включена в пакет
            }
        }

        return summ + curr.price; // Добавляем стоимость, если категория не включена в пакет или лимит исчерпан
    }, 0);

    // Суммируем стоимость пакета и стоимость дополнительных категорий
    const newBilling = price + sumPackage;

    return newBilling;
};


export const setBilling = (checkedCategories, choisedPackage) => (dispatch) => {
    const newBilling = totalBilling(checkedCategories, choisedPackage);
    dispatch({ type: BILLING_ACTION_TYPES.SET_BILLING, payload: newBilling });
};


// const totalBilling = (checkedCategories, choisedPackage) => {

//     const { price: sumPackage } = choisedPackage

//     const price = checkedCategories.reduce((summ, curr) => {
//         const index = choisedPackage.exist.findIndex((obj) => Object.keys(obj)[0] === curr.title);

//         if (index !== -1) {
//             const count = Object.values(choisedPackage.exist[index])[0];

//             if (count > 0) {
//                 choisedPackage.exist[index][curr.title] = count - 1;
//             } else {
//                 return summ + curr.price
//             }
//         } else {
//             return summ + curr.price
//         }
//         return summ
//     }, 0)

//     return price + sumPackage
// };

// export const setBilling = (checkedCategories, choisedPackage) => {
//     const newBilling = totalBilling(checkedCategories, choisedPackage)
//     return createAction(BILLING_ACTION_TYPES.SET_BILLING, newBilling)
// }