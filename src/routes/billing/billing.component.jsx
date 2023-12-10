import { useSelector } from 'react-redux'
import './billing.styles.scss'
import { selectCheckedCategories } from '../../store/checked-categories/checked-categories.selector'

const Billing = () => {
  const checkedCategories = useSelector(selectCheckedCategories)

  const filterChecked = checkedCategories.filter((item) => item.isChecked)

  console.log(filterChecked);

  return (
    filterChecked.length ? (filterChecked.map((item) => {
      return (
        <div className="category" key={item.name}>
          {item.name}
          {item.price}
        </div>
      )
    })) : <span>Нет выбранных категорий</span>
  )
}
export default Billing