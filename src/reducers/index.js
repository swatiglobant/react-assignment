import {combineReducers} from 'redux'
import toDoReducer from "./toDoReducer";

const reducer = combineReducers({
  toDoReducer: toDoReducer
});


export default reducer;