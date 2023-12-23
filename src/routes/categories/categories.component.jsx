import Category from "../../components/category/category.component";
import Button from "../../components/button/button.component";
import "./categories.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { selectCategories } from "../../store/categories/categories.selector";
import { useEffect } from "react";
import {
  getCategoriesAndDocuments,
  getUserDoc,
  updateUserDoc,
} from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCheckedCategories } from "../../store/checked-categories/checked-categories.selector";
import { setCheckedCategoriesMap } from "../../store/checked-categories/checked-categories.action";
import { setBilling } from "../../store/billing/billing.action";
import { selectBilling } from "../../store/billing/billing.selector";
import { Link } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const currentUser = useSelector(selectCurrentUser);
  const billingInfo = useSelector(selectBilling);
  const categories = useSelector(selectCategories);
  const checkedCategories = useSelector(selectCheckedCategories);
  const { choisedPackage } = userInfo;

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
  }, [dispatch]);

  console.log(categories);

  useEffect(() => {
    const getUserDocs = async () => {
      if (!currentUser) return;
      try {
        const docs = await getUserDoc(currentUser);
        const { checkedCategories } = docs;
        dispatch(setCheckedCategoriesMap(checkedCategories));
      } catch (error) {
        console.error(error);
      }
    };

    getUserDocs();
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (choisedPackage) {
      dispatch(setBilling(checkedCategories, choisedPackage));
    }
  }, [checkedCategories, choisedPackage, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserDoc(currentUser, {
        checkedCategories,
        checkout: billingInfo,
      });
      alert("Профиль обновлен!");
    } catch (error) {
      alert("Произошла ошибка при обновлении профиля!", error);
      console.log(error);
    }
  };

  return (
    <div className="categories-container">
      <h2 className="title">Участие</h2>
      {choisedPackage && checkedCategories ? (
        <form className="form-categories" onSubmit={handleSubmit}>
          {Object.keys(categories).map((title) => {
            const category = categories[title];
            return <Category key={title} category={category} title={title} />;
          })}
          <div className="total">Итого: {billingInfo ? billingInfo : 0}</div>
          <Button type="submit">Сохранить</Button>
        </form>
      ) : (
        <div className="no-items">
          <Link className="no-link" to={`/user`}>Выберите пакет</Link>
        </div>
      )}
    </div>
  );
};
export default Categories;
