export default function messageReducer(state, action) {
    switch (action.type) {
      case 'ADD_MESSAGE':
        return [
            ...action.message, ...state
        ]
      default:
        return state
    }
  }