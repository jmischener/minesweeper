import React from "react";
import { Provider } from "react-redux";
import { MineSweeper } from "./layouts/MineSweeper/MineSweeper";
import { store } from "./store/store";

import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MineSweeper />
    </Provider>
  );
};

export default App;
