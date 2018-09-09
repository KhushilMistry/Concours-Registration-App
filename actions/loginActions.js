import firebase from '../src/firebase';
var _ = require('lodash');
var axios = require('axios');

export default {

  signIn: (query) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      firebase.auth().signInWithEmailAndPassword(query.email, query.password).then((user) => {
        const itemsRef = firebase.database().ref().child('/Participants/').child(user.uid);
        firebase.database().ref().child('/Participants/').child(user.uid).once('value').then(function (snap) {
          const userValue = snap.val()
          const userKey = snap.key;
          dispatch({ type: 'SIGN_IN', data: userValue, key: userKey });
          dispatch({ type: 'ERROR_CLEAR' });
        });
        dispatch({ type: 'LOADING_END' });
      }).catch(() => {
        dispatch({ type: 'ERROR', error: 'Wrong Password or Email.' });
        dispatch({ type: 'LOADING_END' });
      });
    };
  },

  signUp: (query) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      firebase.auth().createUserWithEmailAndPassword(query.email, query.password).then((user) => {
        try {
          const itemsRef = firebase.database().ref().child('/Participants/').child(user.uid);
          const userData = {
            Name: query.name,
            Email: query.email,
            Number: query.number,
            College: query.college,
            Amount: 0,
            Accomodation: 0,
            Events: []
          };
          itemsRef.set(userData);
          firebase.database().ref().child('/Participants/').child(user.uid).once('value').then(function (snap) {
            const userValue = snap.val()
            const userKey = snap.key;
            dispatch({ type: 'SIGN_UP', data: userValue, key: userKey });
          });
          dispatch({ type: 'LOADING_END' });
          dispatch({ type: 'ERROR_CLEAR' });
        }
        catch (e) {
          console.log(e);
        }
      }).catch((error) => {
        dispatch({ type: 'ERROR', error: 'Email Already Exists.' });
        dispatch({ type: 'LOADING_END' });
      });
    }
  },

  logout: () => {
    return (dispatch) => {
      firebase.auth().signOut();
      dispatch({ type: 'LOADING_START' });
      dispatch({ type: 'LOG_OUT' });
      dispatch({ type: 'LOADING_END' });
      dispatch({ type: 'ERROR_CLEAR' });
    }
  },

  addEvent: (eventName, key, allEvents, amount) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      const itemsRef = firebase.database().ref().child('/Participants/').child(key).child('/Events');
      let updatedEvents = _.clone(allEvents);
      updatedEvents.push(eventName);
      itemsRef.set(updatedEvents);
      const amountRef = firebase.database().ref().child('/Participants/').child(key).child('/Amount');
      firebase.database().ref().child('/Participants/').child(key).child('/Amount').once('value').then(function (snap) {
        const value = snap.val();
        amountRef.set(value + amount).then(() => {
          dispatch({ type: 'UPDATE_EVENTS', data: eventName });
          dispatch({ type: 'ADD_AMOUNT', data: amount });
          dispatch({ type: 'LOADING_END' });
        });
      });
    }
  },

  removeEvent: (eventName, key, allEvents, amount) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      const itemsRef = firebase.database().ref().child('/Participants/').child(key).child('/Events');
      let updatedEvents = _.clone(allEvents);
      var index = updatedEvents.indexOf(eventName);
      updatedEvents.splice(index, 1);
      itemsRef.set(updatedEvents);
      const amountRef = firebase.database().ref().child('/Participants/').child(key).child('/Amount');
      firebase.database().ref().child('/Participants/').child(key).child('/Amount').once('value').then(function (snap) {
        const value = snap.val();
        amountRef.set(value - amount).then(() => {
          dispatch({ type: 'DELETE_EVENTS', data: updatedEvents });
          dispatch({ type: 'REMOVE_AMOUNT', data: amount });
          dispatch({ type: 'LOADING_END' });
        });
      });
    }
  },

  updateAccomodation: (accomodationNumber, key) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      const itemsRef = firebase.database().ref().child('/Participants/').child(key).child('/Accomodation');
      itemsRef.set(accomodationNumber);
      dispatch({ type: 'CHANGE_ACCOMODATION', data: accomodationNumber });
      dispatch({ type: 'LOADING_END' });
    }
  },

  getAdminData: () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      let arr = [];
      const itemsRef = firebase.database().ref().child('/Participants');

      itemsRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const childData = childSnapshot.val();
          arr.push(childData);
        });
      }).then(() => {
        dispatch({ type: 'ADMIN_DATA', data: arr });
        dispatch({ type: 'LOADING_END' });
      });
    }
  },

  sendEmailConfirmation: (emailID, regEvents, userName, events, accomodation) => {
    return (dispatch) => {

      var eventsText = "";
      var totalAmount = 0;
      _.forEach(regEvents, function(value){
        _.forEach(events, function(eventValue){
          if(eventValue.name === value){
            console.log(eventValue);
            totalAmount = totalAmount + eventValue.Fees;
            eventsText = eventsText + eventValue.name + " "+ eventValue.Fees + " Rs.\n";   
          }
        });
      });

      eventsText = eventsText + "Total Amount to be Paid : " + totalAmount + " Rs.\n";
      eventsText = eventsText + "Accomodation Required for : " + accomodation + " Persons\n\n";

      var query = {
        text: "Dear " + userName +",\n\nThank you for registering for Concours 2018. Your registration has been received, Thanks! Following are your registration details :\n\n" + eventsText + "Regards,\nSports Committee | DA-IICT\n+91 7434-980219‬ | ‭+91 88665 26650",
        email: emailID
      }

      dispatch({ type: 'LOADING_START' });
      axios({
        method: 'post',
        url: 'https://mail-send-app.herokuapp.com/mail-confirmation',
        params: query,
        headers: { "Access-Control-Allow-Origin": "https://mail-send-app.herokuapp.com/" }
      }).then((res) => {
        dispatch({ type: 'LOADING_END' });
      });

    }
  }
};