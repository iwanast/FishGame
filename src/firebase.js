import 'regenerator-runtime/runtime';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  limit,
  orderBy,

} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPHQ6VngV81COWdRVe1ceQX6u5KZdu38E",
  authDomain: "fish-game-ec2d5.firebaseapp.com",
  projectId: "fish-game-ec2d5",
  storageBucket: "fish-game-ec2d5.appspot.com",
  messagingSenderId: "85806620773",
  appId: "1:85806620773:web:6fe1add7e9c0b719d7a68c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let arrayScores = [];

async function storeScoreInFireStore(user, userScore) {
  // storing name and score to firestore
  const docRef = await addDoc(collection(db, "highscore"), {
    score: userScore,
    username: user,
  });
  console.log(docRef.id);
}

async function getScoreAndUsername(callback) {
  // Save first the new user/userscore in Firestore
  let score = JSON.parse(sessionStorage.getItem("score"));
  let username = sessionStorage.getItem("user"); 
  //When game is functioning, we do not cancel out this anymore, but for now we do not want to save all the scores each time we restart
  //storeScoreInFireStore(username, score); 

  // take now from Firestore the best 2
  const highScoreCol = collection(db, 'highscore')
  const q =  query(highScoreCol, orderBy("score", "desc"), limit(2))
  const querySnapshot = await getDocs(q); 
  populateHighscoreArray(querySnapshot); 
  callback(arrayScores)
}

function populateHighscoreArray(querySnapshot) {
  arrayScores = [];
  querySnapshot.forEach((item) => {
    arrayScores.push({
      score: item.data().score, 
      username : item.data().username,
    });
  });
  sessionStorage.setItem("bestScores", arrayScores);
}

export {getScoreAndUsername}