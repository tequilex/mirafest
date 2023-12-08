import { useNavigate } from 'react-router-dom'
import logo from '../../img/icon.png'

import './header.styles.scss'


const Header = () => {
  const navigate = useNavigate()

  const goToReg = () => {
    navigate('/auth/sign-up')
  }

  const goToSign = () => {
    navigate('/auth')
  }

  const goToMain = () => {
    navigate('/')
  }

  return (
    <div className='header' >
      <div className="wrap" onClick={goToMain}>
        <img className="logo" src={logo} alt="logo" />
        <div className="name">AMIRAFEST</div>
      </div>
      <div className="toReg">
        <div onClick={goToSign} className="sign-in">Вход</div>
        <div className="">/</div>
        <div onClick={goToReg} className="sign-up">Регистрация</div>
      </div>
    </div>
  )
}
export default Header