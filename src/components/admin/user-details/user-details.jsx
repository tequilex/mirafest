import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { selectUserDetails } from "../../../store/user-details/user-details.selector";

import "./user-details.scss";
import {
  deleteUserFromDatabaseAndAuth,
  getUserDocs,
} from "../../../utils/firebase/firebase.utils";
import { setUserDetails } from "../../../store/user-details/user-details.action";

const UserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState("user-details-list");

  const userDetails = useSelector(selectUserDetails);
  const { email } = useParams();

  useEffect(() => {
    const userDocs = async () => {
      const docs = await getUserDocs();
      dispatch(setUserDetails(docs));
    };

    userDocs();
  }, []);

  const activeToggler = () => {
    if (!open) {
      setIsActive("user-details-list active");
    } else {
      setIsActive("user-details-list");
    }
    setOpen(!open);
  };

  const deleteUser = async (uid) => {
    try {
      await deleteUserFromDatabaseAndAuth(uid);
      alert("Пользователь удален");
      navigate("/apanel");
    } catch (error) {
      alert("Ошибка", error);
      console.log(error);
    }
  };

  return (
    <div className="user-details-container">
      {userDetails
        .filter((user) => user.email === email)
        .map(
          ({
            uid,
            displayName,
            mentor,
            nameCollective,
            email,
            birthday,
            city,
            number,
            skill,
            choisedPackage,
            linkDisk,
            checkedCategories,
            checkout,
          }) => (
            <Fragment key={uid}>
              <Link to="/apanel" className="link">
                &#10094; Назад
              </Link>
              <h2 className="title">{displayName}</h2>
              <ul className={isActive}>
                <li className="user-details-item">
                  <span className="item-name">Номер телефона:</span>
                  <span className="item">{number}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">Руководитель:</span>
                  <span className="item">{mentor}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">Название коллектива:</span>
                  <span className="item">{nameCollective}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">Пакет:</span>
                  <span className="item">{choisedPackage?.title}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">Город:</span>
                  <span className="item">{city}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">Уровень мастерства:</span>
                  <span className="item">{skill}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">Email:</span>
                  <span className="item">{email}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">День рождения:</span>
                  <span className="item">{birthday}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">Ссылка на музыку:</span>
                  {linkDisk === "не указана" ? (
                    <div>{linkDisk}</div>
                  ) : (
                    <a
                      className="item item-link"
                      href={linkDisk}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Перейти
                    </a>
                  )}
                </li>
              </ul>
              {!open ? (
                <div onClick={activeToggler} className="toggle">
                  Развернуть
                </div>
              ) : (
                <div onClick={activeToggler} className="toggle">
                  Свернуть
                </div>
              )}
              <div className="title">Участие</div>
              <ul className="user-checks-list">
                {checkedCategories.map((item) => (
                  <li key={item.id} className="user-details-item">
                    <div className="">{item.name}</div>
                    <div className="">~{item.price}</div>
                  </li>
                ))}
              </ul>
              <div className="checkout">К оплате: {checkout}</div>
              <div className="del-block">
                <div className="del-wrap">
                  <div className="del" onDoubleClick={() => deleteUser(uid)}>
                    Удалить пользователя
                  </div>
                  <div className="inform">для удаления нажмите 2 раза</div>
                </div>
              </div>
            </Fragment>
          )
        )}
    </div>
  );
};

export default UserDetails;
