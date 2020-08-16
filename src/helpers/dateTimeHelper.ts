import { format } from "timeago.js";
import firebase from "firebase";
export const formatDate = (date: Date) => {
  const convert: unknown = date;
  const normalDate = convert as firebase.firestore.Timestamp;
  return format(normalDate.toDate(), "en_US");
};


