import { useDispatch, useSelector } from "react-redux";
import "./billing.styles.scss";
// import { selectCheckedCategories } from "../../store/checked-categories/checked-categories.selector";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { useEffect } from "react";
import { selectCurrentUser } from "../../store/user/user.selector";
import { getUserDoc } from "../../utils/firebase/firebase.utils";
import { setUserInfo } from "../../store/userInfo/user-info.action";
import { Link } from "react-router-dom";

const Billing = () => {
  const dispatch = useDispatch();
  // const checkedCategories = useSelector(selectCheckedCategories);
  const userInfo = useSelector(selectUserInfo);
  const { choisedPackage, checkout, checkedCategories } = userInfo;
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

  return (
    <div className="billing-container">
      <h2 className="title">Оплата</h2>
      <ul className="categories-block">
        {choisedPackage ? (
          <>
            <div className="package-block">
              <div className="block-left">
                <div className="">Выбранный пакет: {choisedPackage.title}</div>
                <div className="">Описание: {choisedPackage.description}</div>
              </div>
              <div className="block-right">
                <div className="">Стоимость: {choisedPackage.price}</div>
              </div>
            </div>
            {checkedCategories.length ? (
              checkedCategories.map((item) => {
                return (
                  <li className="category" key={item.name}>
                    <div className="">{item.name}</div>
                    <div className="">{item.price}</div>
                  </li>
                );
              })
            ) : (
              <span className="no-items">
                <Link className="no-link" to={`/categories`}>Выберите номинации для участия</Link>
              </span>
            )}
          </>
        ) : (
          <div className="no-items">
            <Link className="no-link" to={`/user`}>Выберите пакет</Link>
          </div>
        )}
        <div></div>
        <div className="total">Итого: {checkout ? checkout : 0}</div>
      </ul>
    </div>
  );
};
export default Billing;
