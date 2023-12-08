import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./signIn-form.styles.scss";

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChangeAuth = () => {
        navigate("/auth/sign-up");
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            navigate("/user");
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                alert("Не верный логин или пароль");
            }
            console.log("fail", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-in-container">
            <h2 className="title">Уже есть аккаунт?</h2>
            <div className="subtitle">Войти используя email и пароль</div>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />

                <FormInput
                    label="Пароль"
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    <Button type="submit">Войти</Button>
                </div>
                <div className="goToReg">
                    Нет аккаунта? <span className="goToReg-button" onClick={handleChangeAuth}>Зарегестрироваться!</span>
                </div>
            </form>
        </div>
    );
};
export default SignInForm;
