export interface IUser {
  fullName: string;
  phoneNumber?: string;
  email: string;
  userName: string;
  biography?: string;
  uidUser?: string | null;
  photoURL?: string;
  website?: string;
  gender?: "Male" | "Female" | "Other";
}

export interface ICurrentUser {
  uid: string;
  email: string;
  phoneNumber: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

export interface IUserEntity {
  docId: string;
  user: IUser;
}
