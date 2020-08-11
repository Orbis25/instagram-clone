import firebase from "firebase";

import firebaseConfig from "../../firebase/index";
import { RegisterModel, AuthModel } from "../../models/AuthModels";
import { IUser } from "../../models/UserModel";
import { users } from "../../firebase/colections.json";
import { LOGIN } from "../../router/routes.json";
import UserService from "../../services/userService";

export default class AuthService {
  /**
   * create the user
   * @param model
   */
  createUser(model: RegisterModel): Promise<firebase.auth.UserCredential> {
    return firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(model.email, model.password);
  }
  async addUserDetail(user: IUser): Promise<void> {
    const currentUser = firebaseConfig.auth().currentUser;
    await currentUser?.updateProfile({
      displayName: user.userName,
    });
    return await firebaseConfig.firestore().collection(users).doc().set(user);
  }
  login(user: AuthModel): Promise<firebase.auth.UserCredential> {
    return firebaseConfig
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
  }
  ressetPassword(email: string) {
    return firebaseConfig.auth().sendPasswordResetEmail(email);
  }
  logout(): void {
    localStorage.removeItem("auth");
    firebaseConfig.auth().signOut();
    window.location.href = LOGIN;
  }
  getCurrentUser(): Promise<firebase.User | null> {
    return new Promise((resolved, reject) => {
      firebaseConfig.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolved(user);
        } else {
          reject(null);
        }
      });
    });
  }
  updatePassword(newPassword: string): Promise<void> | undefined {
    const currentUser = firebaseConfig.auth().currentUser;
    return currentUser?.updatePassword(newPassword);
  }

  async loginWithFacebook(): Promise<firebase.auth.UserCredential> {
    const f = firebase;
    const provider = new f.auth.FacebookAuthProvider();
    provider.addScope("user_birthday");
    f.auth().useDeviceLanguage();
    const result = await f.auth().signInWithPopup(provider);
    const usr = result.user;
    if (usr !== null) {
      const exist = await new UserService().getUserDetailByUid(usr.uid);
      if (exist.empty) {
        const usrDetail: IUser = {
          email: usr.email ?? "",
          fullName: usr.displayName ?? "",
          userName: usr.email ?? "",
          photoURL: usr?.photoURL ?? "",
          biography: "",
          gender: "Male",
          phoneNumber: usr.phoneNumber ?? "",
          uidUser: usr.uid,
          website: "",
        };
        await await firebaseConfig
          .firestore()
          .collection(users)
          .doc()
          .set(usrDetail);
      }
    }

    return result;
  }
}
