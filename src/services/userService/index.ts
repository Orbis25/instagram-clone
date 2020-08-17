import firebaseConfig from "../../firebase/";
import firebase from "firebase";

import { IUser } from "../../models/UserModel";
import { AuthModel } from "../../models/AuthModels";
import AuthService from "../authService/";
import collections, { storage } from "../../firebase/colections.json";
import { FireSQL } from "firesql";
import { DocumentData } from 'firesql/utils'

export default class UserService {
  db = firebaseConfig.firestore();
  getUserDetail(
    userName: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return firebaseConfig
      .firestore()
      .collection(collections.users)
      .where("userName", "==", userName)
      .get();
  }

  getUserDetailByUid(
    uid: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return firebaseConfig
      .firestore()
      .collection(collections.users)
      .where("uidUser", "==", uid)
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

  private updateProfileImage(
    photoUrl: string,
    docId: string
  ): Promise<void> | undefined {
    const currentUser = firebaseConfig.auth().currentUser;
    return this.db
      .collection(collections.users)
      .doc(docId)
      .update({
        photoURL: photoUrl,
      })
      .then(() => {
        return currentUser?.updateProfile({
          photoURL: photoUrl,
        });
      });
  }

  uploadImage(
    file: Blob | Uint8Array | ArrayBuffer | any,
    title: string,
    docId: string
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
          return this.updateProfileImage(result, docId);
        });
    });
  }

  getUserByUserName(
    userName: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return firebaseConfig
      .firestore()
      .collection(collections.users)
      .where("userName", "==", userName)
      .get();
  }
  getAllSuggestions(): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return this.db.collection(collections.users).limit(5).get();
  }
  getSuggestions(): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return this.db.collection(collections.users).get();
  }
  getAll(): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return this.db.collection(collections.users).get();
  }
  followUser(currentUid: string, userIdToFollow: string | null | undefined) {
    return this.db
      .collection(collections.following)
      .doc(currentUid)
      .collection(collections.userFollowing)
      .doc()
      .set({ uid: userIdToFollow });
  }
  async unFollowUser(
    currentUid: string,
    userIdToUnFolloe: string | null | undefined
  ) {
    const result = this.db
      .collection(collections.following)
      .doc(currentUid)
      .collection(collections.userFollowing)
      .where("uid", "==", userIdToUnFolloe)
      .get();

    (await result).docs.forEach((value) => {
      this.db
        .collection(collections.following)
        .doc(currentUid)
        .collection(collections.userFollowing)
        .doc(value.id)
        .delete();
    });
  }
  imFollow(
    currentUid: string,
    userIdToFollow: string | null | undefined
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return this.db
      .collection(collections.following)
      .doc(currentUid)
      .collection(collections.userFollowing)
      .where("uid", "==", userIdToFollow)
      .get();
  }

  findUserByUserName(userName: string): Promise<DocumentData[]> {
    const fireSql = new FireSQL(this.db);
    return fireSql.query(
      `SELECT * FROM users WHERE userName LIKE '${userName}%'`
    );
  }
}
