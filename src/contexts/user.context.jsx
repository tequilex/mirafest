import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserDoc,
} from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
  userInfo: {},
  currentUser: null,
  setCurrentUser: () => null,
  setUserInfo: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const value = { currentUser, setCurrentUser, userInfo, setUserInfo };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
        setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getUserDocs = async () => {
      if(currentUser === null) return;
      const docs = await getUserDoc(currentUser)
      setUserInfo(docs)
    }

    getUserDocs()
  }, [currentUser])

// console.log(currentUser);
// console.log(userInfo.DATA_CATEGORIES);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
