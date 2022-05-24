import { combineReducers } from 'redux';
import regexReducer from './regexReducer';
import loginReducer from './loginReducer';

const reducers = combineReducers({
  regex: regexReducer,
  login: loginReducer,
});

export default reducers;
