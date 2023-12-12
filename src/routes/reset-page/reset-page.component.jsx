import { useState } from 'react'
import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import {sendResetPassword} from '../../utils/firebase/firebase.utils'

import { useNavigate } from "react-router-dom";

import './reset-page.styles.scss'


const ResetPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')

  const handleChangeLogin = () => {
    navigate("/auth");
  };

  const handleChange = (event) => {
    const {value} = event.target
    setEmail(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await sendResetPassword(email)
      alert('Ссылка для сброса пароля отправлена на указанный Email')
    } catch (er) {
      console.log(er);
    }
  }

  return (
<div className="forgot-container">
      <h2 className="title">Сброс пароля</h2>
      <div className="subtitle">Введите email аккаунта, доступ к которому нужно восстановить</div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <div onClick={handleChangeLogin} className="toLogin">Вернуться к входу</div>
        <div className="buttons-container">
          <Button type="submit">Сбросить</Button>
        </div>
      </form>
    </div>

  )
}
export default ResetPage