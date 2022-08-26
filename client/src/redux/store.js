import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import auth from "./auth";
import message from "./message";
import reducers from "./reducers"

export default createStore(
  combineReducers({
    auth,
    message,
    reducers,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
