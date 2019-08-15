export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
export const LOGIN_IN = 'LOGIN_IN';
export const LOGIN_OUT = 'LOGIN_OUT';

export function addMessageAction(message) {
    return { type: 'ADD_MESSAGE', message }
}

export function clearMessagesAction() {
    return { type: 'CLEAR_MESSAGES' }
}

export function setLoginAction(login) {
    return { type: 'LOGIN_IN', login }
}

export function loginOutAction() {
    return { type: 'LOGIN_OUT'}
}