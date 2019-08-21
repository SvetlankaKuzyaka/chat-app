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
    case ADD_MESSAGE: {
      let incoming_array = [...action.message];
      if (state.messages.length) {
        const valid_array = incoming_array.filter(item => {
          return !state.messages.some(element => element.id === item.id);
        });
        incoming_array = [...valid_array];
      }
      const final_array = [...incoming_array, ...state.messages].slice(0, 1000);
      console.log(final_array.length);
      return {
        ...state,
        messages: [...final_array]
      };
    }
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: []
      };
    case ADD_MESSAGEOFFLINE:
      return {
        ...state,
        messagesOffline: [...state.messagesOffline, action.message]
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
