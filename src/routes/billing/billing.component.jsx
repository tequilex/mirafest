import { useDispatch, useSelector } from "react-redux";
import "./billing.styles.scss";
import { selectCheckedCategories } from "../../store/checked-categories/checked-categories.selector";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { useEffect } from "react";
import { selectCurrentUser } from "../../store/user/user.selector";
import { getUserDoc } from "../../utils/firebase/firebase.utils";
import { setUserInfo } from "../../store/userInfo/user-info.action";
import { Link } from "react-router-dom";

const Billing = () => {
  const dispatch = useDispatch();
  const checkedCategories = useSelector(selectCheckedCategories);
  const userInfo = useSelector(selectUserInfo);
  const { choisedPackage, checkout } = userInfo;
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const getUserDocs = async () => {
      if (!currentUser) return;
      try {
        const docs = await getUserDoc(currentUser);
        dispatch(setUserInfo(docs));
      } catch (error) {
        console.error(error);
      }
    };

    getUserDocs();
  }, [currentUser, dispatch]);

  // useEffect(() => {
  //   dispatch(setBilling(checkedCategories, choisedPackage));
  // }, [checkedCategories, choisedPackage, dispatch]);

  return (
    <div className="billing-container">
      <h2 className="title">Оплата</h2>
      <ul className="categories-block">
        {choisedPackage.length ? (
          <div className="package-block">
            <div className="">Выбранный пакет: {choisedPackage.title}</div>
            <div className="">Описание: {choisedPackage.description}</div>
            <div className="">Стоимость: {choisedPackage.price}</div>
          </div>
        ) : (
          <Link to={`/categories`}>Выберите пакет</Link>
        )}
        {checkedCategories ? (
          checkedCategories.map((item) => {
            return (
              <li className="category" key={item.name}>
                <div className="">{item.name}</div>
                <div className="">{item.price}</div>
              </li>
            );
          })
        ) : (
          <span className="no-cats">Нет выбранных категорий</span>
        )}
        <div></div>
        <div className="total">Итого: {checkout ? checkout : 0}</div>
      </ul>
    </div>
  );
};
export default Billing;
