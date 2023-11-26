import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_firbase_apiKey,
  authDomain: process.env.REACT_APP_firbase_authDomain,
  projectId: process.env.REACT_APP_firbase_projectId,
  storageBucket: process.env.REACT_APP_firbase_storageBucket,
  messagingSenderId: process.env.REACT_APP_firbase_messagingSenderId,
  appId: process.env.REACT_APP_firbase_appId,
  measurementId: process.env.REACT_APP_firbase_measurementId,
  databaseURL: process.env.REACT_APP_firbase_databaseURL,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
