import { Children, useEffect, useState } from "react";
import { deleteUserFromDatabaseAndAuth, getUserDoc, getUserDocs } from "../../utils/firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setUserInfo } from "../../store/userInfo/user-info.action";
import { useNavigate } from "react-router-dom";
import { selectUserDetails } from "../../store/user-details/user-details.selector";
import { setUserDetails } from "../../store/user-details/user-details.action";

import "./admin-panel.scss";

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userDetails = useSelector(selectUserDetails);

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
    const userDocs = async () => {
      const docs = await getUserDocs();
      dispatch(setUserDetails(docs));
    };

    userDocs();
  }, []);
  const handleChange = (email) => {
    navigate(`/apanel/${email}`);
  };

  const sort = () => {
    let total = 0;
    userDetails.forEach((user) => {
      if (user.role === "user") ++total;
    });
    return total;
  };

  // const deleteUser = async (uid) => {
  //   try {
  //     await deleteUserFromDatabaseAndAuth(uid);
  //     alert("Успех");
  //   } catch (error) {
  //     alert("Ошибка", error);
  //   }
  // };

  return (
    <div className="admin-panel-container">
      <h2 className="title">Админка</h2>
      <div className="total">Всего пользователей: {sort()}</div>
      <ul className="users-list">
        {userDetails.map((user) =>
          user.role === "admin" ? null : (
            <li
              className="user"
              key={user.uid}
              onClick={() => handleChange(user.email)}
            >
              {user.displayName}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;
