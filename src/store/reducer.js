import { ADD_MESSAGE, LOGIN_IN, LOGIN_OUT, CLEAR_MESSAGES } from './actions';

const initialState = {
  name: "",
  messages: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD_MESSAGE:
        return {
            ...state, messages: [...action.message, ...state.messages]
        }
      case CLEAR_MESSAGES:
          return {
            ...state, messages: []
        }
      case LOGIN_IN:
        return {
            ...state, name: action.login
        }
      case LOGIN_OUT:
        return {
            ...state, name: ""
        }
      case 'REDUX_WEBSOCKET::MESSAGE':
        return {
          ...state, messages: [...JSON.parse(action.payload.message), ...state.messages]
        }
      case 'REDUX_WEBSOCKET::OPEN': {
        console.log('open');
        return {...state}
      }
      case 'REDUX_WEBSOCKET::CLOSED': {
        console.log('closed');
        return {...state}
      }
      case 'REDUX_WEBSOCKET::BEGIN_RECONNECT': {
        console.log('begin_reconnect');
        return {...state}
      }
      default:
        return {...state}
    }
  }