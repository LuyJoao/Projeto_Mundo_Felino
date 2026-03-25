import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC48yQi0fEQCOolLjhqm8uqzyeYIOGS6mU",
  authDomain: "projeto-mundofelino.firebaseapp.com",
  projectId: "projeto-mundofelino",
  storageBucket: "projeto-mundofelino.firebasestorage.app",
  messagingSenderId: "149738758982",
  appId: "1:149738758982:web:89c24017f90fac7f31bb47",
  measurementId: "G-HYKFB9JX4Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Exporta o banco de dados