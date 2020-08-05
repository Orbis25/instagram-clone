import { ICurrentUser } from "./UserModel";

export interface IPost {
  firebaseId: string | null;
  text: string | null;
  images: string[];
  user: ICurrentUser;
  createdAt: Date;
}

export interface IComment {
  postId: string;
  userName: string;
  comment: string;
  createdAt: Date;
}
