import { useSelector } from "react-redux";
import "./billing.styles.scss";
import {
  selectCheckedCategories,
  selectCheckedTotal,
} from "../../store/checked-categories/checked-categories.selector";
const Billing = () => {
  const checkedCategories = useSelector(selectCheckedCategories);
  const selectChecked = useSelector(selectCheckedTotal);
  console.log(selectChecked);

  return (
    <div className="billing-container">
      <h2 className="title">Оплата</h2>
      <ul className="categories-block">
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
