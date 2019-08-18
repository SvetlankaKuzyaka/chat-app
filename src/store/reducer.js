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
    default:
      return { ...state };
  }
}
