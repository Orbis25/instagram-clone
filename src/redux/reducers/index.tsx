import { combineReducers } from "redux";

const initialState = {};

function reducerTest(
  state = initialState,
  action: { type: string; payload: object }
): object {
  switch (action.type) {
    case "TEST":
      return { ...state };
    default:
      return { ...state };
  }
}

const rootReducer = combineReducers({ reducerTest });

export default rootReducer;
