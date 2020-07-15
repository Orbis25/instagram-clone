import firebase from "firebase";

import firebaseConfig from "../../firebase/index";
import { RegisterModel, AuthModel } from "../../models/AuthModels";
import { IUser } from "../../models/UserModel";
import { users } from "../../firebase/colections.json";
import { LOGIN } from "../../router/routes.json";

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
  addUserDetail(user: IUser): Promise<any> {
    return firebaseConfig.firestore().collection(users).add(user);
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
}
