import { combineReducers } from "redux";
import dayReducer from "./auth/dayReducer";

const RootReducer = combineReducers({
  tasks: dayReducer,
});

export default RootReducer;
