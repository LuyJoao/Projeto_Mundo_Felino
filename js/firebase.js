import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// 1. Você precisa importar o Analytics aqui:
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC48yQi0fEQCOolLjhqm8uqzyeYIOGS6mU",
  authDomain: "projeto-mundofelino.firebaseapp.com",
  projectId: "projeto-mundofelino",
  storageBucket: "projeto-mundofelino.firebasestorage.app",
  messagingSenderId: "149738758982",
  appId: "1:149738758982:web:89c24017f90fac7f31bb47",
  measurementId: "G-HYKFB9JX4Y"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// 2. Você PRECISA desta linha para o Analytics funcionar:
const analytics = getAnalytics(app);

// Exporta o banco de dados
export const db = getFirestore(app);