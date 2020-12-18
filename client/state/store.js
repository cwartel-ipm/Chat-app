import reducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
//
export default createStore(reducer, applyMiddleware(thunkMiddleware, logger));
