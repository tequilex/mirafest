import { useDispatch, useSelector } from "react-redux";
import "./billing.styles.scss";
import {
  selectCheckedCategories,
  selectCheckedTotal,
} from "../../store/checked-categories/checked-categories.selector";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";

import { selectCategories } from "../../store/categories/categories.selector";
import { selectBilling } from "../../store/billing/billing.selector";
import { setBilling } from "../../store/billing/billing.action";
import { useEffect } from "react";
import { selectCurrentUser } from "../../store/user/user.selector";
import { getUserDoc } from "../../utils/firebase/firebase.utils";
import { setUserInfo } from "../../store/userInfo/user-info.action";
=======


const Billing = () => {
  const dispatch = useDispatch();
  const billingInfo = useSelector(selectBilling);
  const checkedCategories = useSelector(selectCheckedCategories);
  const userInfo = useSelector(selectUserInfo);
  const { choisedPackage } = userInfo;

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
  }, [currentUser]);


  useEffect(() => {
    dispatch(setBilling(checkedCategories, choisedPackage));
  }, [checkedCategories, choisedPackage]);
  
  return (
    <div className="billing-container">
      <h2 className="title">Оплата</h2>
      <ul className="categories-block">
        <div className="package-block">

          <div className="package-wrap">
            <div className="">Выбранный пакет: {choisedPackage.title}</div>
            <div className="">Описание: {choisedPackage.description}</div>
          </div>

          <div className="">Стоимость: {choisedPackage.price}</div>
        </div>
        {checkedCategories.length ? (
          checkedCategories.map((item) => {
            return (
              <li className="category" key={item.name}>
                <div className="">{item.name}</div>
                <div className="">~{item.price}</div>
              </li>
            );
          })
        ) : (
          <span className="no-cats">Нет выбранных категорий</span>
        )}
        <div></div>

        <div className="total">Итого: {billingInfo}</div>

      </ul>
    </div>
  );
};
export default Billing;
