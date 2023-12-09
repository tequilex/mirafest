import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserDetails } from "../../../store/user-details/user-details.selector";

import "./user-details.scss";

const UserDetails = () => {
  const userDetails = useSelector(selectUserDetails);
  console.log(userDetails);
  const { email } = useParams();
  console.log(email);

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
          }) => (
            <Fragment key={uid}>
              <h2 className="title">{displayName}</h2>
              <ul className="user-details-list">
                <li className="user-details-item">
                  <span className="item-name">Имя:</span>
                  <span className="item">{displayName}</span>
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
                  <span className="item-name">Город:</span>
                  <span className="item">{city}</span>
                </li>
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
                  <span className="item-name">Уровень мастерства:</span>
                  <span className="item">{skill}</span>
                </li>
                <li className="user-details-item">
                  <span className="item-name">Пакет:</span>
                  <span className="item">{choisedPackage}</span>
                </li>
              </ul>
            </Fragment>
          )
        )}
    </div>
  );
};

export default UserDetails;
