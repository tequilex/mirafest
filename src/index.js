import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

// import { UserProvider } from "./contexts/user.context";
// import { CheckBoxProvider } from "./contexts/checkbox.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <UserProvider>
  //   <CheckBoxProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  //   </CheckBoxProvider>
  // </UserProvider>
);

reportWebVitals();
