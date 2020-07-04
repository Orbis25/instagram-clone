import { createStore, applyMiddleware } from "redux";
import reduxSaga from "redux-saga";
import reducers from "../reducers";
import rootSagas from "../sagas";

const configureStore = () => {
  const sagaMiddleare = reduxSaga();
  return {
    ...createStore(reducers, applyMiddleware(sagaMiddleare)),
    runSaga: sagaMiddleare.run(rootSagas),
  };
};

export default configureStore;
