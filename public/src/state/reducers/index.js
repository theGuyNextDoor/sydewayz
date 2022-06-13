import { combineReducers } from 'redux';
import regexReducer from './regexReducer';
import loginReducer from './loginReducer';
import calendlyReducer from './calendlyReducer';

const reducers = combineReducers({
  regex: regexReducer,
  login: loginReducer,
  calendly: calendlyReducer,
});

export default reducers;
