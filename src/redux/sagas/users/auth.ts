import { put, call, takeLatest } from "redux-saga/effects";

import {
  USER_AUTHENTICATED_START,
  USER_AUTHENTICATED_SUCCESS,
  USER_AUTHENTICATED_ERROR,
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

export default function* watchAuth() {
  yield takeLatest(USER_AUTHENTICATED_START, authenticatedUser);
}
