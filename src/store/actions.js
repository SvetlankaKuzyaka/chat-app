import ReconnectingWebSocket from "reconnecting-websocket";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const ADD_MESSAGEOFFLINE = "ADD_MESSAGEOFFLINE";
export const CLEAR_MESSAGESOFFLINE = "CLEAR_MESSAGESOFFLINE";
export const LOGIN_IN = "LOGIN_IN";
export const LOGIN_OUT = "LOGIN_OUT";
export const ADD_WEBSOCKET = "ADD_WEBSOCKET";

export function addMessageAction(message) {
  return { type: "ADD_MESSAGE", message };
}

export function clearMessagesAction() {
  return { type: "CLEAR_MESSAGES" };
}

export function addMessageOfflineAction(message) {
  return { type: "ADD_MESSAGEOFFLINE", message };
}

export function clearMessagesOfflineAction() {
  return { type: "CLEAR_MESSAGESOFFLINE" };
}

export function setLoginAction(login) {
  return { type: "LOGIN_IN", login };
}

export function loginOutAction() {
  return { type: "LOGIN_OUT" };
}

export function addWebsocketAction(ws) {
  return { type: "ADD_WEBSOCKET", ws };
}

export function connectWebsocket(URL) {
  console.log("enter");
  return function(dispatch) {
    const ws = new ReconnectingWebSocket(URL);
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      dispatch(addMessageAction(message));
    };
    ws.onclose = () => {
      console.log("disconnected");
      dispatch(clearMessagesAction());
    };
    dispatch(addWebsocketAction(ws));
  };
}
