import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './ducks/User';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
