import Checkbox from "../checkbox/checkbox.component";
import "./category.styles.scss";

const Category = ({ title, category }) => {

  return (
    <div className="category-block">
      <h3 className="category-title">{title}</h3>
      {category.map((item) => (
        <Checkbox key={item.id} item={item}/>
      ))}
    </div>
  );
};
export default Category;
