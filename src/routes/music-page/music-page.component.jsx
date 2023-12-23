import { useEffect, useState } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";

import "./music-page.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userInfo/user-info.selector";
import { getUserDoc, updateUserDoc } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setUserInfo } from "../../store/userInfo/user-info.action";

const MusicPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)
  const currentUser = useSelector(selectCurrentUser)
  const [link, setLink] = useState(userInfo.linkDisk)

  useEffect(() => {
    const getUserMusicLink = async () => {
      const link = await getUserDoc(currentUser)
      dispatch(setUserInfo(link));
    }

    getUserMusicLink()
  }, [currentUser, dispatch])

  useEffect(() => {
    setLink(userInfo.linkDisk);
  }, [userInfo]);

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
