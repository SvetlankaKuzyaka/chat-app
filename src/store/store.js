import { applyMiddleware, createStore } from "redux";
import reduxWebsocket from '@giantmachines/redux-websocket';

import reducer from "./reducer";

const websocketMiddleware = reduxWebsocket();
const store = createStore(reducer, applyMiddleware(websocketMiddleware));

export default store;