import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCVyoa0h7FgjrmWDljiX4E3jmQPgMjWAyU",
  authDomain: "experiment-c7a75.firebaseapp.com",
  databaseURL: "https://experiment-c7a75.firebaseio.com",
  projectId: "experiment-c7a75",
  storageBucket: "experiment-c7a75.appspot.com",
  messagingSenderId: "433165568080"
};
firebase.initializeApp(config);

export default firebase;