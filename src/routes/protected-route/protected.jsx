// import { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector";
// import { UserContext } from "../../contexts/user.context";

const ProtectedRoute = ({ children }) => {
    // const { currentUser } = useContext(UserContext);
    const currentUser = useSelector(selectCurrentUser);
    if (currentUser === null) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default ProtectedRoute;
