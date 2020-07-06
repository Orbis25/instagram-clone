import { combineReducers } from "redux";
import AuthReducer from "./users/auth";

const rootReducer = combineReducers({ AuthReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>