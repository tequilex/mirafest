import { Children, useEffect, useState } from "react";
import { getUserDoc, getUserDocs } from "../../utils/firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setUserInfo } from "../../store/userInfo/user-info.action";
import { useNavigate } from "react-router-dom";
import { selectUserDetails } from "../../store/user-details/user-details.selector";
import { setUserDetails } from "../../store/user-details/user-details.action";

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
      }

      userDocs();
  }, [])
  const handleChange = (email) => {
      navigate(`/apanel/${email}`)
  }

  return (
      <div>
          <h1>Admin panel</h1>
          {userDetails.map((user) => (
              user.role === "admin" ? null :
              <div key={user.email}>
                  <p onClick={() => handleChange(user.email)}>{user.displayName}</p>
              </div>
          ))}
      </div>
  )
}

export default AdminPanel;