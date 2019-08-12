import {combineReducers} from "redux";
import pocemons from "./pocemons/reducer";
const reducers = combineReducers({
  pocemons,
});

export default reducers;
