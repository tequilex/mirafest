import Checkbox from "../checkbox/checkbox.component";
import "./category.styles.scss";

const Category = ({ items, index }) => {

  return (
    <div className="category-block">
      <h3 className="category-title">{items.title}</h3>
      {items.items.map((item, index) => {
        return (
          <Checkbox key={index} inf={item} index={index} />
        );
      })}
    </div>
  );
};
export default Category;
