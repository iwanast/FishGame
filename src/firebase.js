import 'regenerator-runtime/runtime';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  get,
  setDoc,
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
let userScore = {username: "testName", score: 10 }
let arrayScores = [];


async function getScoreAndUsername() {
  const highScoreCol = collection(db, 'highscore')
  const q =  query(highScoreCol, orderBy("score", "desc"), limit(2))
  const querySnapshot = await getDocs(q); 
  
  querySnapshot.forEach((item) => {
    arrayScores.push(item)
  });
  console.log(arrayScores[0])
  //const highScoreList = highScoreSnapshot.docs.map(doc => doc.data(limit(2), orderBy("score", "desc")));
  return arrayScores;
 
}

export {getScoreAndUsername, userScore}