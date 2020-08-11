import {
  USER_AUTHENTICATED_ERROR,
  USER_AUTHENTICATED_START,
  USER_AUTHENTICATED_SUCCESS,
  GET_CURRENTUSER_START,
  GET_CURRENTUSER_ERROR,
  GET_CURRENTUSER_SUCCESS,
  USER_AUTHENTICATED_START_FB,
  USER_AUTHENTICATED_SUCCESS_FB,
  USER_AUTHENTICATED_ERROR_FB,
} from "../../../consts/userActionTypes";
import { IAuthReducer } from "./types";

const initialState: IAuthReducer = {
  isAutenticated: localStorage.getItem("auth") === "true" ? true : false,
  user: null,
};

export default function (state = initialState, action: any) {
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

    case USER_AUTHENTICATED_START_FB:
      return { ...state };
    case USER_AUTHENTICATED_SUCCESS_FB:
      return { ...state, isAutenticated: true, errorMessage: null };
    case USER_AUTHENTICATED_ERROR_FB:
      return {
        ...state,
        isAutenticated: false,
        errorMessage: action.error?.message,
      };

    case GET_CURRENTUSER_START:
      return { ...state };
    case GET_CURRENTUSER_SUCCESS:
      return { ...state, user: action.results };
    case GET_CURRENTUSER_ERROR:
      return { ...state, user: null };
    default:
      return { ...state };
  }
}
