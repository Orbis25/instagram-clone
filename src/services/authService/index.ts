import firebaseConfig from "../../firebase/index";
import { RegisterModel } from "../../models/AuthModels";
import { User } from "../../models/UserModel";
import { users } from "../../firebase/colections.json";
import firebase from "firebase";

export default class AuthService {
  createUser(model: RegisterModel): Promise<firebase.auth.UserCredential> {
    return firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(model.email, model.password);
  }
  addUserDetail(user: User): Promise<any> {
    return firebaseConfig.firestore().collection(users).add(user);
  }
}
