import imgTargets from "../../img/targets.jpg";
import "./targets.styles.scss";

const Targets = () => {
  return (
    <div className="targets-section">
      <h3 className="title">Цели проведения фестиваля:</h3>
      <div className="targets-section-wrapper">
        <div className="targets-info">
          Знакомство с миром профессионального восточного танца, знакомство с
          культурой и историей танца стран Египта и Ближнего Востока. Создание
          условий для развития восточного танца в регионе, а также создание
          дружеской атмосферы среди участников мероприятия.
        </div>
        <div className="img-wrapper">
          <img className="targets-img" src={imgTargets} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Targets;
