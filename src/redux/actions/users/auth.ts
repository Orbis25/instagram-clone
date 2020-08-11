import {
  USER_AUTHENTICATED_START,
  GET_CURRENTUSER_START,
  USER_AUTHENTICATED_START_FB,
} from "../../../consts/userActionTypes";
import { AuthModel } from "../../../models/AuthModels";

export const authenticatedUser = (payload: AuthModel) => ({
  type: USER_AUTHENTICATED_START,
  payload,
});

export const authenticatedUserWithFb = () => ({
  type: USER_AUTHENTICATED_START_FB,
});

export const getCurrentUser = () => ({
  type: GET_CURRENTUSER_START,
});
