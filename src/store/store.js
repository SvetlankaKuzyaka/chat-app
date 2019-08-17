import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
// import reduxWebsocket from '@giantmachines/redux-websocket';

import reducer from "./reducer";

// const websocketMiddleware = reduxWebsocket();
const middlewares = [thunkMiddleware];
const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
