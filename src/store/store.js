import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducer";

const middlewares = [thunkMiddleware];
const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
