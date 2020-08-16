import firebaseConfig from "../../firebase/index";
import {
  INotification,
  NotificationState,
} from "../../models/NotificationModels";
import collections from "../../firebase/colections.json";
import { getRamdonId } from "../../helpers/sharedHelper";

export default class NotificationService {
  db = firebaseConfig.firestore();
  async create(model: INotification): Promise<void> {
    model.id = getRamdonId(model.userIdOwnerPost);
    model.createdAt = new Date();
    model.state = NotificationState.Active;
    return await this.db.collection(collections.notification).doc().set(model);
  }
  getNotifications(
    userId: string
  ): firebase.firestore.Query<firebase.firestore.DocumentData> {
    return this.db
      .collection(collections.notification)
      .where("userIdOwnerPost", "==", userId)
      .orderBy("createdAt", "desc");
  }

  getNotificationsActive(
    userId: string
  ): firebase.firestore.Query<firebase.firestore.DocumentData> {
    return this.db
      .collection(collections.notification)
      .where("userIdOwnerPost", "==", userId)
      .where("state", "==", NotificationState.Active)
      .orderBy("createdAt", "desc");
  }

  async updateNotification(docId: string, model: INotification): Promise<void> {
    return await this.db
      .collection(collections.notification)
      .doc(docId)
      .update(model);
  }

  async setViewMyNotification(userId: string): Promise<void> {
    const results = await this.getNotificationsActive(userId).get();
    results.forEach(async (value) => {
      let _model = value.data() as INotification;
      _model.state = NotificationState.View;
      await this.updateNotification(value.id, _model);
    });
  }
}
