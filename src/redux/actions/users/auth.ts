import { USER_AUTHENTICATED_START } from "../../../consts/userActionTypes";
import { AuthModel } from "../../../models/AuthModels";

export const authenticatedUser = (payload: AuthModel) => ({
  type: USER_AUTHENTICATED_START,
  payload,
});
