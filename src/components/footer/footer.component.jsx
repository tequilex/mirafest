import "./footer.styles.scss";
import logo from '../../img/icon.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="wrap">
        <img className="logo" src={logo} alt="logo" />
        <div className="name">AMIRAFEST</div>
      </div>
      <div className="policy">Все права защищены</div>
    </div>
  );
};
export default Footer;
