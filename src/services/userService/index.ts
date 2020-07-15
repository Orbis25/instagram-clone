import firebaseConfig from "../../firebase/";
import collections from "../../firebase/colections.json";
import firebase from "firebase";

import { IUser } from "../../models/UserModel";
import { AuthModel } from "../../models/AuthModels";
import AuthService from "../authService/";
import { storage } from "../../firebase/colections.json";

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
    const currentUser = firebaseConfig.auth().currentUser;
    if (model.email !== authModel.email) {
      await new AuthService().login(authModel);
      await currentUser?.updateEmail(model.email);
    }
    await currentUser?.updateProfile({
      displayName: model.userName,
    });
    const db = firebaseConfig.firestore();
    return db.collection(collections.users).doc(docId).update(model);
  }

  private updateProfileImage(photoUrl: string): Promise<void> | undefined {
    const currentUser = firebaseConfig.auth().currentUser;
    return currentUser?.updateProfile({
      photoURL: photoUrl,
    });
  }

  uploadImage(
    file: Blob | Uint8Array | ArrayBuffer | any,
    title: string
  ): Promise<void> | undefined {
    const stg = firebaseConfig.storage();
    const ref = stg.ref(storage.profile).child(title);
    const resultUpload = ref.put(file);

    return resultUpload.then(() => {
      stg
        .ref(storage.profile)
        .child(title)
        .getDownloadURL()
        .then((result) => {
          return this.updateProfileImage(result);
        });
    });
  }
}
