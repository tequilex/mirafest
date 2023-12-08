// import { useContext } from "react";
// import { UserContext } from "../../contexts/user.context";
import Category from "../../components/category/category.component";
import Button from "../../components/button/button.component";
import "./categories.styles.scss";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";

const Categories = () => {
// const { userInfo } = useContext(UserContext);
const userInfo = useSelector(selectUserInfo)

const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        // await updateUserCategoryDoc(currentUser, checkbox)
        alert('успешно обновлено')
    } catch (error) {
        console.log('ошибка', error);
    }
}

return (
    <div className="categories-container">
        <form onSubmit={handleSubmit}>
            {userInfo.DATA_CATEGORIES.map((items, i) => {
                console.log(items);
                return <Category key={i} items={items} index={i}/>;
            })}
            <Button type='submit'>Сохранить</Button>
        </form>
    </div>
);
};
export default Categories;
