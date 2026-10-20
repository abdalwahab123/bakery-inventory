
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEc8GGvdyRN289vuB0ggwoXIQo548j32Y",
  authDomain: "bakery-inventory-e9c3a.firebaseapp.com",
  projectId: "bakery-inventory-e9c3a",
  storageBucket: "bakery-inventory-e9c3a.firebasestorage.app",
  messagingSenderId: "723680593563",
  appId: "1:723680593563:web:ab424120d1016e7437a83e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const BAKERY_ID = "bakery001";
