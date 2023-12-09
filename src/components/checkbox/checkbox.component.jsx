import { useState } from "react";

const Checkbox = ({ item }) => {
  

  const handleChange = (event) => {
    const { checked } = event.target;
  };

  return (
      <label className="category">
        <input
          name={item.name}
          type="checkbox"
          // checked={item.isChecked}
          onChange={handleChange}
        />
        {item.name}
      </label>
  );
};
export default Checkbox;
