import firebase from "@firebase/app";
import "@firebase/firestore";
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA0OjnW7H-cD0LrYVfExAZ5fH91vDs9roQ",
    authDomain: "hypes-audio.firebaseapp.com",
    databaseURL: "https://hypes-audio.firebaseio.com",
    projectId: "hypes-audio",
    storageBucket: "hypes-audio.appspot.com",
    messagingSenderId: "354136609244"
};

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth(); 

const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export default firestore;