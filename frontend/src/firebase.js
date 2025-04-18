import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtJlLPUlmFXZWUEbtg-whMePNdhEdoTeA",
  authDomain: "textfeed-30a24.firebaseapp.com",
  projectId: "textfeed-30a24",
  storageBucket: "textfeed-30a24.firebasestorage.app",
  messagingSenderId: "580432261161",
  appId: "1:580432261161:web:c306c274ab94ca06ecec38",
  measurementId: "G-D7YG3PGKMD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
