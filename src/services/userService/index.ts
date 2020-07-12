import firebaseConfig from "../../firebase/";
import collections from "../../firebase/colections.json";
import firebase from "firebase";

import { IUser } from "../../models/UserModel";
import { AuthModel } from "../../models/AuthModels";
import AuthService from "../authService/";

export default class UserService {
  getUserDetail(
    uidUser: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return firebaseConfig
      .firestore()
      .collection(collections.users)
      .where("uidUser", "==", uidUser)
      .get();
  }

  async update(
    docId: string,
    model: IUser,
    authModel: AuthModel
  ): Promise<void> {
    
    if (model.email !== authModel.email) {
      await new AuthService().login(authModel);
    }
    const db = firebaseConfig.firestore();
    const currentUser = firebaseConfig.auth().currentUser;

    await currentUser?.updateEmail(model.email);
    await currentUser?.updateProfile({
      displayName: model.userName,
      photoURL: model.photoURL,
    });
    return db.collection(collections.users).doc(docId).update(model);
  }
}
