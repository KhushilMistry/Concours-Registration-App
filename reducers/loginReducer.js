var _ = require('lodash');

const INITIAL_STATE = {
  user: '',
  loading : false,
  key : '',
  users : ''
};

export default function (state = INITIAL_STATE, action) {
  const appState = Object.assign({}, state)

  switch (action.type) {
    case 'SIGN_IN':
      appState.user = action.data;
      appState.key = action.key;
      appState.events = action.data.Events || [];
      break;
    case 'SIGN_UP':
      appState.user = action.data;
      appState.key = action.key;
      appState.events = action.data.Events || [];
      break;
    case 'LOADING_START':
      appState.loading = true;
      break;
    case 'LOADING_END':
      appState.loading = false;
      break;
    case 'ERROR':
      appState.error = action.error;
      break;
    case 'LOG_OUT':
      appState.user = '';
      appState.key = '';
      break;
    case 'UPDATE_EVENTS':
      appState.events = [
        ...appState.events,
        action.data
      ];
      break;
    case 'DELETE_EVENTS':
      let eventIndex;
      _.forEach(appState.events, function(value,index){
        if(value.name === action.data){
          eventIndex = index;
        }
      });
      let x = _.cloneDeep(appState.events);
      x.splice(eventIndex, 1);
      appState.events = x;
      break;
    case 'ADMIN_DATA':
      appState.users = action.data;
      break;

    default:
      return state;
  }
  return appState;
};