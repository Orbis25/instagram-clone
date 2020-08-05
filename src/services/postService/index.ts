import firebaseConfig from "../../firebase";
import collections, { storage } from "../../firebase/colections.json";
import { IPost, IComment } from "../../models/PostModel";

export default class PostService {
  db = firebaseConfig.firestore();

  async uploadImage(
    file: Blob | Uint8Array | ArrayBuffer | any,
    userName: string
  ): Promise<any> {
    const dateDirk = `${new Date().getDay()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    const timeStamp = Date.now();

    const stg = firebaseConfig.storage();
    const ref = stg
      .ref(`${storage.posts}/${userName}/${dateDirk}`)
      .child(`${userName}-${timeStamp}`);
    const resultUpload = ref.put(file);

    await resultUpload;
    console.log(await resultUpload);
    return stg
      .ref(`${storage.posts}/${userName}/${dateDirk}`)
      .child(`${userName}-${timeStamp}`)
      .getDownloadURL();
  }
  async create(model: IPost): Promise<void> {
    return await this.db
      .collection(collections.posts)
      .doc(model.user.uid)
      .collection(collections.userPosts)
      .doc()
      .set(model);
  }
  async getUsersFollowing(
    uid: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    const userFollowin = await this.db
      .collection(collections.following)
      .doc(uid)
      .collection(collections.userFollowing)
      .get();

    return userFollowin;
  }
  async getAll(uid: string) {
    return await this.db
      .collection(collections.posts)
      .doc(uid)
      .collection(collections.userPosts)
      .where("user.uid", "==", uid)
      .get();
  }
  async addComment(comment: IComment): Promise<void> {
    return await this.db
      .collection(collections.commentsPost)
      .doc()
      .set(comment);
  }
  async getComments(
    postId: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return await this.db
      .collection(collections.commentsPost)
      .where("postId", "==", postId)
      .orderBy("createdAt","desc").limit(2)
      .get();
  }
}
