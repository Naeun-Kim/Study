import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBMHAaTiSTkFXOWURD_3DNgHghtXswWOBI',
  authDomain: 'twitter-clone-9658e.firebaseapp.com',
  projectId: 'twitter-clone-9658e',
  storageBucket: 'twitter-clone-9658e.appspot.com',
  messagingSenderId: '80710530189',
  appId: '1:80710530189:web:ad2458b77aae1ed8d91ec4',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
