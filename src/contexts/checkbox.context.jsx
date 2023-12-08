import { createContext, useState, useEffect } from "react";


export const CheckBoxContext = createContext({
  checkbox: {},
  setCheckBox: () => {}
});

export const CheckBoxProvider = ({children}) => {

  const [checkbox, setCheckBox] = useState();
  const value = {setCheckBox, checkbox}



  

  return <CheckBoxContext.Provider value={value}>{children}</CheckBoxContext.Provider>
}