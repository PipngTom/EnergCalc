import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import buildings from './buildings';

export default combineReducers({
  alert,
  auth,
  buildings
});