import { useState } from "react";

import "./signUp-form.styles.scss";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import DATA_CATEGORIES from "../../data-categories.js";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
    displayName: "",
    birthday: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
};

// console.log(DATA_CATEGORIES);

const SignUpForm = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, birthday, city, email, password, confirmPassword } =
        formFields;

        const handleChangeAuth = () => {
            navigate("/auth");
        };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, {
                displayName,
                city,
                birthday,
                number: "",
                skill: "не выбран",
                choisedPackage: "не выбран",
                role: 'user',
                nameCollective: '',
                DATA_CATEGORIES
            });
            setFormFields(defaultFormFields);
            navigate("/user");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Пользователь с таким email уже зарегистрирован");
            }
            console.log("user don't create", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2 className="title">Еще нет аккаунта?</h2>
            <span className="subtitle">Зарегистрируйтесь используя email и пароль</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="ФИО"
                    required
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    label="Дата рождения"
                    required
                    type="text"
                    onChange={handleChange}
                    name="birthday"
                    value={birthday}
                />

                <FormInput
                    label="Город"
                    required
                    type="text"
                    onChange={handleChange}
                    name="city"
                    value={city}
                />

                <FormInput
                    label="Email"
                    required
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Пароль"
                    required
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <FormInput
                    label="Подтвердите пароль"
                    required
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit">Зарегистрироваться</Button>
                <div className="goToReg">
                    Уже есть аккаунт? <span className="goToReg-button" onClick={handleChangeAuth}>Войти!</span>
                </div>
            </form>
        </div>
    );
};
export default SignUpForm;
