import firebaseConfig from "../../firebase";
import collections, { storage } from "../../firebase/colections.json";
import { IPost, IComment, ILikePost, ISavedPost } from "../../models/PostModel";

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
      .orderBy("createdAt", "desc")
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
      .orderBy("createdAt", "desc")
      .limit(2)
      .get();
  }
  async getAllComments(
    postId: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return await this.db
      .collection(collections.commentsPost)
      .where("postId", "==", postId)
      .orderBy("createdAt", "asc")
      .get();
  }

  async getPost(
    id: string,
    userUid: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return await this.db
      .collection(collections.posts)
      .doc(userUid)
      .collection(collections.userPosts)
      .where("postId", "==", id)
      .get();
  }

  async addLike(model: ILikePost): Promise<void> {
    return await this.db.collection(collections.LikesPosts).doc().set(model);
  }

  async checkLike(model: ILikePost): Promise<boolean> {
    return await this.db
      .collection(collections.LikesPosts)
      .where("userId", "==", model.userId)
      .where("postId", "==", model.postId)
      .get()
      .then((result) => {
        return result.empty;
      });
  }

  async removeLike(model: ILikePost): Promise<boolean> {
    return await this.db
      .collection(collections.LikesPosts)
      .where("userId", "==", model.userId)
      .where("postId", "==", model.postId)
      .get()
      .then((result) => {
        result.forEach(async (value) => {
          return await this.db
            .collection(collections.LikesPosts)
            .doc(value.id)
            .delete();
        });
        return false;
      });
  }

  async savePost(model: ISavedPost): Promise<void> {
    return await this.db.collection(collections.savedPosts).doc().set(model);
  }

  async getPostSaved(
    userId: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return await this.db
      .collection(collections.savedPosts)
      .where("userId", "==", userId)
      .get();
  }

  async checkPostsaved(model: ISavedPost): Promise<boolean> {
    return await this.db
      .collection(collections.savedPosts)
      .where("userId", "==", model.userId)
      .where("postId", "==", model.postId)
      .get()
      .then((result) => {
        return !result.empty;
      });
  }
  async removeSavedPost(model: ISavedPost): Promise<boolean> {
    return await this.db
      .collection(collections.savedPosts)
      .where("userId", "==", model.userId)
      .where("postId", "==", model.postId)
      .get()
      .then((result) => {
        result.forEach(async (value) => {
          return await this.db
            .collection(collections.savedPosts)
            .doc(value.id)
            .delete();
        });
        return false;
      });
  }
  async removePost(id: string, userId: string): Promise<void> {
    const results = await this.db
      .collection(collections.posts)
      .doc(userId)
      .collection(collections.userPosts)
      .where("postId", "==", id)
      .get();

    results.forEach(async (response) => {
      const { id } = response;
      await this.db
        .collection(collections.posts)
        .doc(userId)
        .collection(collections.userPosts)
        .doc(id)
        .delete();
    });
  }
  async getMyPosts(
    id: string
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > {
    return await this.db
      .collection(collections.posts)
      .doc(id)
      .collection(collections.userPosts)
      .get();
  }
}
