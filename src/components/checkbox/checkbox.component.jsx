import { useDispatch, useSelector } from "react-redux";
import { selectCheckedCategories } from '../../store/checked-categories/checked-categories.selector'
import { setCheckedCategories } from '../../store/checked-categories/checked-categories.action'
import './checbox.styles.scss'


const Checkbox = ({ item, title }) => {
  const dispatch = useDispatch();
  const checkedCategories = useSelector(selectCheckedCategories);

  const handleChange = (event) => {
    const { checked } = event.target;
    dispatch(setCheckedCategories(checkedCategories, item, checked, title))
  };

  const filterChecked = checkedCategories.find(el => el.name === item.name)
  

  return (
  
      <label className="category">
        <div className="cat-item">
        <input
          name={item.name}
          type="checkbox"
          checked={filterChecked && filterChecked.isChecked}
          onChange={handleChange}
        />
        {item.name}
        </div>
        <div className='price'>~{item.price}</div>
      </label>
      

  );
};
export default Checkbox;
