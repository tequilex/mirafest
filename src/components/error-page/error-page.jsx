import { useNavigate } from "react-router-dom";
import './error-page.scss';

const ErrorPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }
    return (
        <div className="error-page">
            <p className="not-found">
                <span>4</span>
                <img src="../../../Smile.jpg" alt="Smile" />
                <span>4</span>
            </p>
            <p className="not-found-desc">
                Страница не найдена
            </p>
            <span className="back" onClick={handleClick}>Вернуться на главную</span>
        </div>
    );
};

export default ErrorPage;