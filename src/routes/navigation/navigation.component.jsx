import { Fragment } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../store/user/user.action";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";

import { persistor } from '../../store/store';

const Navigation = () => {
    const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo);
    const { role } = userInfo;

    const dispatch = useDispatch();
    const signOutHandler = async () => {
        await signOutUser();
        // dispatch(setCurrentUser(null));

        await persistor.purge();

        window.location.reload()

        ;
    };
    return (
        <Fragment>
            <div className="navigation">
                <div className="nav-wrap">
                <div className="nav-links-container">
                    {role === "admin" ? (
                        <Link className="nav-link" to="/apanel">
                            Админ панель
                        </Link>
                    ) : (
                        <>
                        <Link className="nav-link" to="/user">
                            Анкета
                        </Link>
                        <Link className="nav-link" to="/music">
                            Музыка
                        </Link>
                            <Link className="nav-link" to="/categories">
                                Участие
                            </Link>

                            <Link className="nav-link" to="/billing">
                                Оплата
                            </Link>
                        </>
                    )}
                </div>
                <span className="nav-link" onClick={signOutHandler}>
                        Выйти
                </span>
                </div>
                <span className="name">Пользователь: {userInfo.displayName}</span>
            </div>
            
            <Outlet />
        </Fragment>
    );
};
export default Navigation;