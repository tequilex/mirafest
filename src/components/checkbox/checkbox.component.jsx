import { useDispatch, useSelector } from "react-redux";
import { selectCheckedCategories, selectCheckedToAdd } from '../../store/checked-categories/checked-categories.selector'
import { setCheckedCategories } from '../../store/checked-categories/checked-categories.action'

const Checkbox = ({ item }) => {
  const dispatch = useDispatch();
  const checkedCategories = useSelector(selectCheckedCategories);

  const handleChange = (event) => {
    const { checked } = event.target;
    dispatch(setCheckedCategories(checkedCategories, item, checked))
  };

  const filterChecked = checkedCategories.find(el => el.name === item.name)
  
  return (
      <label className="category">
        <input
          name={item.name}
          type="checkbox"
          checked={filterChecked && filterChecked.isChecked}
          onChange={handleChange}
        />
        {item.name}
      </label>
  );
};
export default Checkbox;
