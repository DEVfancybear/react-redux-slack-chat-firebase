// config firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBh91GP4MNVUlnEUjVO-t1OB8tpmqM6rUs",
    authDomain: "react-redux-slack-chat.firebaseapp.com",
    databaseURL: "https://react-redux-slack-chat.firebaseio.com",
    projectId: "react-redux-slack-chat",
    storageBucket: "react-redux-slack-chat.appspot.com",
    messagingSenderId: "234451018569",
    appId: "1:234451018569:web:d77cf19b80c6d9da5f3098",
    measurementId: "G-Q0NGLKEX39"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;