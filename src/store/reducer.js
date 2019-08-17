import {
  ADD_MESSAGE,
  LOGIN_IN,
  LOGIN_OUT,
  CLEAR_MESSAGES,
  ADD_WEBSOCKET,
  ADD_MESSAGEOFFLINE,
  CLEAR_MESSAGESOFFLINE
} from "./actions";

const initialState = {
  name: "",
  messages: [],
  socket: false,
  messagesOffline: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...action.message, ...state.messages]
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: []
      };
    case ADD_MESSAGEOFFLINE:
      return {
        ...state,
        messagesOffline: [action.message, ...state.messagesOffline]
      };
    case CLEAR_MESSAGESOFFLINE:
      return {
        ...state,
        messagesOffline: []
      };
    case LOGIN_IN:
      return {
        ...state,
        name: action.login
      };
    case LOGIN_OUT:
      return {
        ...state,
        name: ""
      };
    case ADD_WEBSOCKET:
      return {
        ...state,
        socket: action.ws
      };
    // case "REDUX_WEBSOCKET::MESSAGE":
    //   return {
    //     ...state,
    //     messages: [...JSON.parse(action.payload.message), ...state.messages]
    //   };
    // case "REDUX_WEBSOCKET::OPEN": {
    //   console.log("open");
    //   return { ...state };
    // }
    // case "REDUX_WEBSOCKET::CLOSED": {
    //   console.log("closed");
    //   return { ...state };
    // }
    // case "REDUX_WEBSOCKET::BEGIN_RECONNECT": {
    //   console.log("begin_reconnect");
    //   return { ...state };
    // }
    // case "REDUX_WEBSOCKET::RECONNECTED": {
    //   console.log("reconnected");
    //   return { ...state, messages: [] };
    // }
    default:
      return { ...state };
  }
}
