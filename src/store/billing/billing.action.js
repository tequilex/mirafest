import { createAction } from "../../utils/reducer/reducer.utils"
import { BILLING_ACTION_TYPES } from "./billing.types"

const totalBilling = (checkedCategories, choisedPackage) => {

    const { price: sumPackage } = choisedPackage
    console.log(sumPackage);

    const price = checkedCategories.reduce((summ, curr) => {
        const index = choisedPackage.exist.findIndex((obj) => Object.keys(obj)[0] === curr.title);

        if (index !== -1) {
            const count = Object.values(choisedPackage.exist[index])[0];

            if (count > 0) {
                choisedPackage.exist[index][curr.title] = count - 1;
            } else {
                return summ + curr.price
            }
        } else {
            return summ + curr.price
        }
        return summ
    }, 0)

    return price + sumPackage
};

export const setBilling = (checkedCategories, choisedPackage) => {
    const newBilling = totalBilling(checkedCategories, choisedPackage)
    return createAction(BILLING_ACTION_TYPES.SET_BILLING, newBilling)
}