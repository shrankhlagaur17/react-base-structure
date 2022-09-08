import { combineReducers } from '@reduxjs/toolkit';
import LoginSlice from '../pages/login/services/login.slice';

const rootReducer = combineReducers({
  login: LoginSlice,
});

export default rootReducer;
