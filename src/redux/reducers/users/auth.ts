import {
  USER_AUTHENTICATED_ERROR,
  USER_AUTHENTICATED_START,
  USER_AUTHENTICATED_SUCCESS,
} from "../../../consts/userActionTypes";
import { IActionType, IAuthReducer } from "./types";

const initialState: IAuthReducer = {
  isAutenticated: localStorage.getItem("auth") === "true" ? true : false
};

export default function (state = initialState, action: IActionType) {
  switch (action.type) {
    case USER_AUTHENTICATED_START:
      return { ...state };
    case USER_AUTHENTICATED_SUCCESS:
      return { ...state, isAutenticated: true, errorMessage: null };
    case USER_AUTHENTICATED_ERROR:
      return {
        ...state,
        isAutenticated: false,
        errorMessage: action.error?.message,
      };
    default:
      return { ...state };
  }
}
