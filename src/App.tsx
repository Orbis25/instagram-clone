import React from "react";
import Router from "./router/index.routes";
import { Provider } from "react-redux";
import createStore from "./redux/store/";

import "./App.css"

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
