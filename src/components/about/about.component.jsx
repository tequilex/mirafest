import aboutLogo from "../../img/logo.jpg";

import "./about.styles.scss";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-logo-wrap">
        <img className="about-logo" src={aboutLogo} alt="about-logo" />
      </div>
      <div className="about-wrap">
        <h1 className="title">AMIRAFEST</h1>
        <div className="about">
          Фестиваль арабской культуры и восточного танца, с участием звёзд
          мирового масштаба и оркестра ближневосточной музыки, который пройдёт
          15-17 марта в городе Архангельск.
        </div>
        <div className="subtitle">В рамках фестиваля пройдёт:</div>
        <ul className="about-list">
          <li className="about-item">- обучающая сессия от известнейших педагогов России;</li>
          <li className="about-item">- конкурс под СД и живую музыку;</li>
          <li className="about-item">- яркий гала-концерт;</li>
        </ul>
        <div className="about-section-footer">
          Фестиваль открыт для всех желающих. Конкурсная программа включает в
          себя ряд различных номинаций, в том числе и свободную танцевальную
          категорию. Участники получат медали и дипломы.
        </div>
      </div>
    </div>
  );
};
export default About;
