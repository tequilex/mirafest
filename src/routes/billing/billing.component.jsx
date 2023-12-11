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
  const {choisedPackage} = userInfo

  return (
    <div className="billing-container">
      <h2 className="title">Оплата</h2>
      <ul className="categories-block">
      <div className="package-block">
        <div className="">Выбранный пакет: {choisedPackage.title}</div>
        <div className="">Описание: {choisedPackage.description}</div>
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
        })) : (
        <span className="no-cats">Нет выбранных категорий</span>
      )}
      <div>
      </div>
        <div className="total">Итого: {selectChecked}</div>
      </ul>
    </div>
  );
};
export default Billing;
