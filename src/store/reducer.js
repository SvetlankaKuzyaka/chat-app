import { ADD_MESSAGE, LOGIN_IN, LOGIN_OUT, CLEAR_MESSAGES } from './actions';

export default function reducer(state, action) {
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
      default:
        return state
    }
  }