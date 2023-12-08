import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
    const userInfo = useSelector(selectUserInfo);
    const { role } = userInfo;

    if (role === "user") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRouteAdmin;