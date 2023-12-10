import { useState } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";

import "./music-page.styles.scss";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { updateUserDoc } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../store/user/user.selector";

const MusicPage = () => {
  const userInfo = useSelector(selectUserInfo)
  const currentUser = useSelector(selectCurrentUser)

  const [link, setLink] = useState(userInfo.linkDisk)

  const handleChange = (event) => {
    const {value} = event.target
    setLink(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await updateUserDoc(currentUser, {linkDisk: link})
      alert('Ссылка сохранена!')
    } catch (error) {
      console.log('Не удалось сохранить', error);
    }
  }

  console.log(link);
  return (
    <div className="music-container">
      <h2 className="title">Музыка</h2>
      <form className="music-form" onSubmit={handleSubmit}>
        <FormInput 
          label='Укажите ссылку на ЯндексДиск'
          required
          type="text"
          name="linkDisk"
          value={link || ""}
          onChange={handleChange}
        />
        
        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  );
};
export default MusicPage;
