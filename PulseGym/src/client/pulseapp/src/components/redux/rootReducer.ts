import { gymReducer } from "./gymReducer";
import {combineReducers} from 'redux';
import { hallReducer } from "./hallReducer";

export const rootReducer = combineReducers({
    gymReducer, hallReducer
})

