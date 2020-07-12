import { put, call, takeLatest } from "redux-saga/effects";

import {
  USER_AUTHENTICATED_START,
  USER_AUTHENTICATED_SUCCESS,
  USER_AUTHENTICATED_ERROR,
  GET_CURRENTUSER_ERROR,
  GET_CURRENTUSER_SUCCESS,
  GET_CURRENTUSER_START,
} from "../../../consts/userActionTypes";
import AuthService from "../../../services/authService/index";
import { AutenticatedUserType } from "./types";

export function* authenticatedUser({ payload }: AutenticatedUserType) {
  try {
    const results = yield call(new AuthService().login, payload);
    localStorage.setItem("auth", "true");
    yield put({ type: USER_AUTHENTICATED_SUCCESS, results });
  } catch (error) {
    yield put({ type: USER_AUTHENTICATED_ERROR, error });
  }
}

export function* getCurrentUser() {
  try {
    const results = yield call(new AuthService().getCurrentUser);
    yield put({ type: GET_CURRENTUSER_SUCCESS, results });
  } catch (error) {
    yield put({ type: GET_CURRENTUSER_ERROR });
  }
}

export default function* watchAuth() {
  yield takeLatest(USER_AUTHENTICATED_START, authenticatedUser);
  yield takeLatest(GET_CURRENTUSER_START, getCurrentUser);
}
