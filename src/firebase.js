import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCmQvSyCw1EuRRgRzqIDcvlD0ns1hCNQHI",
  authDomain: "synapse2018-feb69.firebaseapp.com",
  databaseURL: "https://synapse2018-feb69.firebaseio.com",
  projectId: "synapse2018-feb69",
  storageBucket: "synapse2018-feb69.appspot.com",
  messagingSenderId: "21242449598"
};
firebase.initializeApp(config);

export default firebase;