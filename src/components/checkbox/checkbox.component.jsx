import {useEffect, useState, useContext } from "react";
import { CheckBoxContext } from "../../contexts/checkbox.context";

const Checkbox = ({ inf, index, arr }) => {
  const { setCheckBox, checkbox} = useContext(CheckBoxContext);

  // console.log(arr);
  
  // useEffect(() => {
  //   setCheckBox(arr)
  // })

  const handleChange = (event) => {
    const { checked } = event.target;

    arr.map((item) => (
      item.isChecked = checked
    ))

    setCheckBox(arr);
    // console.log({...arr[index].isChecked = checked} );
    // setCheckBox(arr[index].isChecked = checked);
    
    // console.log({...userInfo.DATA_CATEGORIES[0].items});
    // console.log(arr);
    
  };
  console.log(checkbox);
  return (
      <label key={index} className="category">
        <input
          name={inf.name}
          type="checkbox"
          checked={arr.isChecked}
          onChange={handleChange}
        />
        {inf.name}
      </label>
  );
};
export default Checkbox;
