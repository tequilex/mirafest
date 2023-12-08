import tasksImg from "../../img/tasks.jpg";
import "./tasks.styles.scss";

const Tasks = () => {
  return (
    <div className="tasks-section">
      <h3 className="tasks-title">Задачи проведения Фестиваля:</h3>
      <div className="tasks-wrapper">
        <div className="tasks-img-wrapper">
          <img className="tasks-img" src={tasksImg} alt="img" />
        </div>
        <ul className="list-tasks">
          <li className="tasks">
            • Развивать творческую активность среди жителей разных стран
          </li>
          <li className="tasks">• Развивать восточный танец в регионе</li>
          <li className="tasks">• Обогатить духовный мир детей и взрослых; </li>
          <li className="tasks">
            • Презентовать восточный танец, как профессиональную сферу
            деятельности;{" "}
          </li>
          <li className="tasks">• Пропаганда здорового образа жизни; </li>
          <li className="tasks">
            • Обмен опыта среди руководителей и участниц фестиваля;{" "}
          </li>
          <li className="tasks">• Объединение танцевальных коллективов; </li>
          <li className="tasks">
            • Создавать условия для раскрытия творческих способностей.
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Tasks;
