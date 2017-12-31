import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';
import loginStates from './loginReducer';

export default combineReducers({
  routing,
  loginStates
});
