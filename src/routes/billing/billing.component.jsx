import { useSelector } from "react-redux";
import "./billing.styles.scss";
import {
  selectCheckedCategories,
  selectCheckedTotal,
} from "../../store/checked-categories/checked-categories.selector";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";

const Billing = () => {
  const checkedCategories = useSelector(selectCheckedCategories);
  const selectChecked = useSelector(selectCheckedTotal);
  const userInfo = useSelector(selectUserInfo);
  const { choisedPackage } = userInfo;


  const pizdec = (checkedCategories, choisedPackage) => {
    const price = checkedCategories?.reduce((summ, curr) => {
      const index = choisedPackage.exist.findIndex((obj) => Object.keys(obj)[0] === curr.title);
  
      if (index !== -1) {
        const count = Object.values(choisedPackage.exist[index])[0];
  
        if (count > 0) {
          choisedPackage.exist[index][curr.title] = count - 1;
        } else {
          return summ + curr.price
        }
      }
      return summ
    }, 0)

    return price
  }

  
  

console.log(userInfo);
// console.log(price);

  return (
    <div className="billing-container">
      <h2 className="title">Оплата</h2>
      <ul className="categories-block">
        <div className="package-block">
          <div className="package-wrap">
            <div className="">Выбранный пакет: {choisedPackage.title}</div>
            <div className="">Описание: {choisedPackage.description}</div>
          </div>
          <div className="">Стоимость: {choisedPackage.price}</div>
        </div>
        {checkedCategories.length ? (
          checkedCategories.map((item) => {
            return (
              <li className="category" key={item.name}>
                <div className="">{item.name}</div>
                <div className="">~{item.price}</div>
              </li>
            );
          })
        ) : (
          <span className="no-cats">Нет выбранных категорий</span>
        )}
        <div></div>
        <div className="total">Итого:{}</div>
      </ul>
    </div>
  );
};
export default Billing;
