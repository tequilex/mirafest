import { useState, useEffect } from "react";
import {
  // addCollectionAndDocuments,
  getPackagesAndDocuments,
  getUserDoc,
  updateUserDoc,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import "./user-page.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setUserInfo } from "../../store/userInfo/user-info.action";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { Navigate } from "react-router-dom";
import { setPackages } from "../../store/packages/packages.action";
import { selectPackages } from "../../store/packages/packages.selector";
// import DATA_CATEGORIES from "../../data-categories";
// import DATA_PACKAGES from "../../data-packages";

const UserPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const currentUser = useSelector(selectCurrentUser);
  const packagesMap = useSelector(selectPackages);

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
  }, [currentUser, dispatch]);

  useEffect(() => {
    setFormFields(userInfo);
  }, [userInfo]);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const packagesMap = await getPackagesAndDocuments();
        dispatch(setPackages(packagesMap));
      } catch (error) {
        console.log(error);
      }
    };

    getPackages();
  }, [dispatch]);

  if (userInfo.role === "admin") {
    return <Navigate to="/apanel" replace />;
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
    nameCollective,
  } = formFields;

  console.log(choisedPackage);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserDoc(currentUser, {...formFields, choisedPackage: packagesMap.find((item) => item.title === choisedPackage || item.title === choisedPackage.title)});
      alert("Профиль обновлен!");
    } catch (error) {
      alert("Произошла ошибка при обновлении профиля!");
      console.log(error);
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
            <select
              className="select"
              name="skill"
              value={skill}
              onChange={handleChange}
            >
              <option value={"дебют"}>дебют</option>
              <option value={"начинающие"}>начинающие</option>
              <option value={"продолжающие"}>продолжающие</option>
              <option value={"профессионалы"}>профессионалы</option>
            </select>
          </div>

          <div className="select-wrap">
            <span>Пакет</span>
            <select
              className="select"
              name="choisedPackage"
              onChange={handleChange}
              value={choisedPackage?.title }
            >
              {!choisedPackage && <option>Не выбран пакет</option>}
              {packagesMap.map((item) => {
                return <option key={item.id}>{item.title}</option>;
              })}
            </select>
          </div>
        </div>

        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  );
};
export default UserPage;
