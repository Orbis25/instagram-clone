import { ICurrentUser } from "../../../models/UserModel";

interface IAction {
  type: string;
}

export interface IAuthReducer {
  isAutenticated?: Boolean;
  errorMessage?: string;
  user?: ICurrentUser | null;
}
