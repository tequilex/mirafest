import { useState, useEffect, useContext} from "react";
import Checkbox from "../checkbox/checkbox.component";

import "./category.styles.scss";

const Category = ({ items, index }) => {
  const arr = []

  const addObject = (obj) => {
    
    arr.push(obj)
    // console.log(arr);
  }

  return (
    <div className="category-block">
      <h3 className="category-title">{items.title}</h3>
      {items.items.map((item, index) => {
        // console.log(item);
        addObject(item)
        // console.log(arr);
        return (
          <Checkbox key={index} inf={item} index={index} arr={arr}/>
        );
      })}
    </div>
  );
};
export default Category;
