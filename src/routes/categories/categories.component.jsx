import Category from "../../components/category/category.component";
import Button from "../../components/button/button.component";
import "./categories.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { selectCategories } from "../../store/categories/categories.selector";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.action";

const Categories = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryMap = await getCategoriesAndDocuments("categories");
        dispatch(setCategories(categoryMap));
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  console.log(categories);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await updateUserCategoryDoc(currentUser, checkbox)
      alert("Успешно обновлено!");
    } catch (error) {
      console.log("Ошибка!", error);
    }
  };

  return (
    <div className="categories-container">
      <form onSubmit={handleSubmit}>
            {Object.keys(categories).map((title) => {
                const category = categories[title]
                console.log(category);
                return <Category key={title} category={category} title={title} />
            })}
            <Button type='submit'>Сохранить</Button>
        </form>
    </div>
  );
};
export default Categories;
