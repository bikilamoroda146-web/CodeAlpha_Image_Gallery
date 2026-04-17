import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8HI0Cbn0eCJ9ITSvGe6TWnnL93ioltw8",
  authDomain: "image-gallery-auth-5b31a.firebaseapp.com",
  projectId: "image-gallery-auth-5b31a",
  storageBucket: "image-gallery-auth-5b31a.appspot.com",
  messagingSenderId: "858369423350",
  appId: "1:858369423350:web:31a96e9fc9776c4e05f9d7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);