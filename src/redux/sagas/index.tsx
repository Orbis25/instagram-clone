import { all } from "redux-saga/effects";
import authSaga from './users/auth'
export default function* rootSaga() {
  yield all([authSaga()]);
}
