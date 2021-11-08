import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "../../config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch(error => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const newsCollection = db.collection("news");
const eventsCollection = db.collection("events");
const dataCollection = db.collection("data");

export { auth, db, usersCollection, newsCollection, eventsCollection, dataCollection, storage };
