import * as firebase from "firebase";
import {
  apiKey,
  authDomain,
  appId,
  databaseURL,
  messagingSenderId,
  projectId,
  storageBucket,
} from "./config.json";

export const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const initialize = firebase.initializeApp(firebaseConfig);

export default initialize;
