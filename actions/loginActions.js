import loginUtils from '../src/utils/loginUtils';
import firebase from '../src/firebase';
var _ = require('lodash');

export default {
  signIn: (query) => {
    return (dispatch) => {
      var x = 0;
      dispatch({ type: 'LOADING_START' });
      const itemsRef = firebase.database().ref().child('/Participants');

      itemsRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const childData = childSnapshot.val();
          const childKey = childSnapshot.key;
          if (childData.Email === query.email && childData.Password === query.password) {
            dispatch({ type: 'SIGN_IN', data: childData, key: childKey });
            x++;
          }
        });
      }).then(() => {
        if (x === 0) {
          dispatch({ type: 'ERROR', error: 'Wrong Password or Email.' });
        }
        dispatch({ type: 'LOADING_END' });
      });

    };
  },
  signUp: (query) => {
    return (dispatch) => {
      var x = 0;
      dispatch({ type: 'LOADING_START' });
      console.log(query);
      const itemsRef = firebase.database().ref().child('/Participants');
      itemsRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childData.Email === query.email) {
            dispatch({ type: 'ERROR', error: 'Email Already Exists.' });
            x++;
          }
        });
      }).then(() => {
        if (x === 0) {
          const item = {
            Name: query.name,
            Email: query.email,
            Password: query.password,
            Number: query.number,
            College: query.college,
            Events: []
          };

          itemsRef.push(item);
          itemsRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              const childData = childSnapshot.val();
              const childKey = childSnapshot.key;
              if (childData.Email === query.email) {
                dispatch({ type: 'SIGN_UP', data: childData, key: childKey });
              }
            });
          })

        }
        dispatch({ type: 'LOADING_END' });
      });

    };
  },
  logout: () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      dispatch({ type: 'LOG_OUT' });
      dispatch({ type: 'LOADING_END' });
    }
  },
  addEvent: (event, options, key, allEvent) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      const allEvents = allEvent || [];
      const itemsRef = firebase.database().ref().child('/Participants/' + key + '/Events');
      const item = {
        'name': event.name,
        'options': options
      }
      allEvents.push(item);
      itemsRef.set(allEvents);
      const itemsRefNew = firebase.database().ref().child('/Participants');
      itemsRefNew.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childKey === key) {
            dispatch({ type: 'UPDATE_EVENTS', data: item });
            dispatch({ type: 'LOADING_END' });
          }
        });
      })
    }
  },
  removeEvent: (eventName, key, allEvents) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START' });
      const itemsRef = firebase.database().ref().child('/Participants/' + key + '/Events');
      let eventsConst = allEvents;
      let eventIndex;
      _.forEach(eventsConst, function (value, index) {
        if (value.name === eventName) {
          eventIndex = index;
        }
      });
      eventsConst.splice(eventIndex, 1);
      itemsRef.set(eventsConst).then(() => {
        dispatch({ type: 'DELETE_EVENTS', data: eventName });
        dispatch({ type: 'LOADING_END' });
      });

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
  }
};