import { useEffect } from "react";
import SignInForm from "../../components/signIn-form/signIn-form.component";
import SignUpForm from "../../components/signUp-form/signUp-form.component";
import Header from "../../components/header/header.component";
import "./auth.styles.scss";
import { Navigate, useLocation } from "react-router-dom";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setCurrentUser } from "../../store/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import ResetPage from "../../components/reset-page";

const Auth = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="auth-wrap">
      <Header />
      <div className="auth-container">
        {currentUser ? (
          <Navigate to={`/user`} />
        ) : location.pathname === "/auth/sign-up" ? (
          <SignUpForm />
        ) : location.pathname === "/auth/reset-password" ? (
          <ResetPage />
        ) : (
          <SignInForm />
        )}
      </div>
    </div>
  );
};
export default Auth;
