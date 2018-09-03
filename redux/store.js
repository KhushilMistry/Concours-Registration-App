import {createStore, applyMiddleware, compose} from 'redux';
import { persistReducer } from 'redux-persist';
import reducer from '../reducers';
import logger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(initialState = {}, history) {
  return createStore(persistedReducer, initialState, compose(applyMiddleware(
    thunk,
    routerMiddleware(history)
  )));
};