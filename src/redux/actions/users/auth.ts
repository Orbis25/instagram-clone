import {
  USER_AUTHENTICATED_START,
  GET_CURRENTUSER_START,
} from "../../../consts/userActionTypes";
import { AuthModel } from "../../../models/AuthModels";

export const authenticatedUser = (payload: AuthModel) => ({
  type: USER_AUTHENTICATED_START,
  payload,
});

export const getCurrentUser = () => ({
  type: GET_CURRENTUSER_START,
});
