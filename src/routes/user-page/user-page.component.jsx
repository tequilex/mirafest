import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import { addCollectionAndDocuments, getUserDoc, updateUserDoc } from "../../utils/firebase/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";

import "./user-page.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import {setUserInfo} from "../../store/userInfo/user-info.action"
import { selectUserInfo } from "../../store/userInfo/user-info.selector"
import { Navigate } from "react-router-dom";
import { selectCheckedCategories } from "../../store/checked-categories/checked-categories.selector";
// import DATA_CATEGORIES from "../../data-categories";
// import DATA_PACKAGES from '../../data-packages'

const UserPage = () => {
    // const { userInfo, currentUser } = useContext(UserContext);
    const userInfo = useSelector(selectUserInfo);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const checkedCategories = useSelector(selectCheckedCategories)

    console.log(checkedCategories);

    const [formFields, setFormFields] = useState(userInfo);

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', DATA_CATEGORIES)
    // }, [])

    // useEffect(() => {
    //     addCollectionAndDocuments('packages', DATA_PACKAGES)
    // }, [])

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
        setFormFields(userInfo);
    }, [userInfo]);

    if (userInfo.role === "admin") {
        return <Navigate to='/apanel' replace />
    }

    const {
        displayName,
        birthday,
        city,
        email,
        number,
        skill,
        mentor,
        choisedPackage,
        nameCollective
    } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUserDoc(currentUser, formFields);
            alert("Профиль обновлен!");
        } catch (error) {
            alert("Произошла ошибка при обновлении профиля!", error);
        }
    };

    return (
        <div className="user-container">
            <h2 className="title">Анкета</h2>
            <form className="form-user" onSubmit={handleSubmit}>
                <FormInput
                    label="ФИО (НАЗВАНИЕ ГРУППЫ)"
                    required
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName || ""}
                />

                <FormInput
                    label="Дата рождения"
                    required
                    type="text"
                    onChange={handleChange}
                    name="birthday"
                    value={birthday || ""}
                />

                <FormInput
                    label="Город"
                    required
                    type="text"
                    onChange={handleChange}
                    name="city"
                    value={city || ""}
                />

                <FormInput
                    label="Email"
                    required
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email || ""}
                />

                <FormInput
                    label="Номер телефона"
                    required
                    type="tel"
                    onChange={handleChange}
                    name="number"
                    value={number || ""}
                />

                <FormInput
                    label="Название коллектива"
                    type="text"
                    onChange={handleChange}
                    name="nameCollective"
                    value={nameCollective || ""}
                />

                <FormInput
                    label="ФИО Руководителя"
                    type="text"
                    onChange={handleChange}
                    name="mentor"
                    value={mentor || ""}
                />

                <div className="selects">
                    <div className="select-wrap">
                    <span>Уровень мастерства</span>
                <select className="select" name="skill" onChange={handleChange}>
                    <option defaultValue="выбрать">{skill}</option>
                    <option>дебют</option>
                    <option>начинающие</option>
                    <option>продолжающие</option>
                    <option>профессионалы</option>
                </select>
                </div>

                <div className="select-wrap">
                <span>Пакет</span>
                <select className="select" name="choisedPackage" onChange={handleChange}>
                    <option defaultValue="выбрать">{choisedPackage}</option>
                    <option>MAXI</option>
                    <option>MIDI</option>
                    <option>MINI</option>
                    <option>KIDS</option>
                    <option>STUDY</option>
                </select>
                </div>
                </div>

                <Button type="submit">Сохранить</Button>
            </form>
        </div>
    );
};
export default UserPage;
