import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDqGdt1dEUA1w6hkui_x6E4_iot4-Ankoc",
  authDomain: "staff-32044.firebaseapp.com",
  databaseURL: "https://staff-32044-default-rtdb.firebaseio.com",
  projectId: "staff-32044",
  storageBucket: "staff-32044.appspot.com",
  messagingSenderId: "925913301453",
  appId: "1:925913301453:web:c350958cf080ab81098484",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
export const database = getDatabase(app);
