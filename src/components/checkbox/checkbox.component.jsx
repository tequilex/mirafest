import { useDispatch, useSelector } from "react-redux";
import { selectCheckedCategories } from "../../store/checked-categories/checked-categories.selector";
import { setCheckedCategories } from "../../store/checked-categories/checked-categories.action";

const Checkbox = ({ item }) => {
  const dispatch = useDispatch();
  const checkedCategories = useSelector(selectCheckedCategories);

  const handleChange = (event) => {
    const { checked, name } = event.target;

  };

  console.log(checkedCategories);

  return (
    <label className="category">
      <input
        name={item.name}
        type="checkbox"
        // checked={true}
        onChange={handleChange}
      />
      {item.name}
    </label>
  );
};
export default Checkbox;
