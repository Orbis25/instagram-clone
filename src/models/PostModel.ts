import { ICurrentUser } from "./UserModel";

export interface IPost {
  postId: string;
  firebaseId: string | null;
  text: string | null;
  images: string[];
  user: ICurrentUser;
  createdAt: Date;
}

export interface IComment {
  userId: string;
  postId: string;
  comment: string;
  createdAt: Date;
}

export interface ILikePost {
  userId: string;
  postId: string;
}

export interface ISavedPost extends ILikePost {
  userPostedId: string;
}
