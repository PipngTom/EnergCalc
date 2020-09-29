import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import buildings from "./buildings";
import measures from "./measures";

export default combineReducers({
  alert,
  auth,
  buildings,
  measures,
});
