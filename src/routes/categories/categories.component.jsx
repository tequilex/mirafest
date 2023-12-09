import Category from "../../components/category/category.component";
import Button from "../../components/button/button.component";
import "./categories.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { selectCategories } from "../../store/categories/categories.selector";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from '../../store/categories/categories.action';

const Categories = () => {
const userInfo = useSelector(selectUserInfo)
const dispatch = useDispatch()
const categories = useSelector(selectCategories)

useEffect(() => {
    const getCategories = async () => {
        try {
            const categoryMap = await getCategoriesAndDocuments('categories')
            dispatch(setCategories(categoryMap))
        } catch (error) {
            console.log(error)
        }
    }

    getCategories();
}, [])


const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        // await updateUserCategoryDoc(currentUser, checkbox)
        alert('Успешно обновлено!')
    } catch (error) {
        console.log('Ошибка!', error);
    }
}

return (
    <div className="categories-container">
        {/* <form onSubmit={handleSubmit}>
            {userInfo.DATA_CATEGORIES.map((items, i) => {
                console.log(items);
                return <Category key={i} items={items} index={i}/>;
            })}
            <Button type='submit'>Сохранить</Button>
        </form> */}
    </div>
);
};
export default Categories;
