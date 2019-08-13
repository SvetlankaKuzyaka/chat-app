import { ADD_MESSAGE } from './actions';

export default function reducer(state, action) {
    switch (action.type) {
      case ADD_MESSAGE:
        return {
            ...state, messages: [...action.message, ...state.messages]
        }
      default:
        return state
    }
  }