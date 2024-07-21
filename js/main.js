const firebaseConfig = {
  apiKey: "AIzaSyBSU2H1WI6SeF3_sZZi2QM8wG6oU4zPMx4",
  authDomain: "wordlish-s.firebaseapp.com",
  projectId: "wordlish-s",
  storageBucket: "wordlish-s.appspot.com",
  messagingSenderId: "135559310678",
  appId: "1:135559310678:web:ebb920c16e72bff6e97af7",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const stroageRef = firebaseApp.storage().ref();
let loginBtn = document.getElementById("login-btn");
let verifyBtn = document.getElementById("verify-btn");
let phoneInp = document.getElementById("phone");
let otpInp = document.getElementById("otp");
let recaptcha = document.getElementById("recaptcha-container");

// Collections

const usersCollections = db.collection("users");
const adminCollections = db.collection("admins");
const roomsCollections = db.collection("rooms");
