export enum NotificationType {
  Commnet,
  Like,
}

export enum NotificationState {
  Active,
  View,
}

export interface INotification {
  id?: string | null;
  type: NotificationType;
  userIdNotification: string; // USER SEND THE NOTIFICATION
  userIdOwnerPost: string; // USER OWNER OF POST
  PostId: string;
  createdAt?: Date;
  state?: NotificationState;
}
