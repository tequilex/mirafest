import { useDispatch, useSelector } from "react-redux";
import { selectCheckedCategories, selectCheckedToAdd } from '../../store/checked-categories/checked-categories.selector'
import { setCheckedCategories } from '../../store/checked-categories/checked-categories.action'

const Checkbox = ({ item }) => {
  const dispatch = useDispatch()
  const checkedCategories = useSelector(selectCheckedCategories)

  const handleChange = (event) => {
    const { checked } = event.target;
    // console.log(checked);

    // dispatch(setCheckedCategories(checked ? [...checkedCategories, item] : checkedCategories.filter(el => el.name !== item.name)));
    dispatch(setCheckedCategories(checkedCategories, item, checked))

  };

  const headerStone = checkedCategories.find(el => el.name === item.name)
  
  return (
      <label className="category">
        <input
          name={item.name}
          value={item.name}
          type="checkbox"
          checked={headerStone && headerStone.isChecked}
          onChange={handleChange}
        />
        {item.name}
      </label>
  );
};
export default Checkbox;
