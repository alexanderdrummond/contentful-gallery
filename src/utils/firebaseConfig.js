import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "todo-2f8d1.firebaseapp.com",
  projectId: "todo-2f8d1",
  storageBucket: "todo-2f8d1.appspot.com",
  messagingSenderId: "929762787740",
  appId: "1:929762787740:web:5a6306b1095a5cde610859"
};

initializeApp(firebaseConfig);


const auth = getAuth();

export { auth };