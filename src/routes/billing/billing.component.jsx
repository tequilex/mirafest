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
    <>
      {checkedCategories.length ? (
        checkedCategories.map((item) => {
          return (
            <div className="category" key={item.name}>
              {item.name}
              {item.price}
            </div>
          );
        })) : (
        <span>Нет выбранных категорий</span>
      )}
      <div>
        <span>Итого: {selectChecked}</span>
      </div>
    </>
  );
};
export default Billing;
