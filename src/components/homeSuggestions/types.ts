import { ICurrentUser, IUser } from "../../models/UserModel";
export type SuggestionsProps = {
  user: ICurrentUser;
  fullName: string;
  usersSuggestions: IUser[];
  usersFollowing: string[];
};
