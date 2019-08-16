import React from "react";
import { DateTime } from "luxon";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
// import ReconnectingWebSocket from 'reconnecting-websocket';
// import ReconnectingWebSocket from '../utils/reconnecting-websocket';
import { Redirect } from 'react-router-dom';
import { disconnect, send } from '@giantmachines/redux-websocket';
import store from "../store/store";

import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import { addMessageAction, loginOutAction, clearMessagesAction } from '../store/actions';

// const URL = "ws://st-chat.shas.tel";
// const URL = "wss://wssproxy.herokuapp.com/";

const ChatBox = ({ name, messages, addMessage, loginOut, clearMessages}) => {
  // const [name, setName] = useState('Kuzya');
  // const [ws, setWs] = useState(new WebSocket(URL));
  // const [ws] = useState(new ReconnectingWebSocket(URL));

  // useEffect(() => {
    // let isNotice = true;
    // function addNotification() {
    //   function clickFunc() {
    //     isNotice = true;
    //   }
    //   if (!("Notification" in window)) {
    //     alert("This browser does not support desktop notification");
    //   }
    //   else if (Notification.permission === "granted") {
    //     if (document.hidden) {
    //       const notification = new Notification(
    //         "Бегом в чат! Есть непрочитанные сообщения!",
    //         {
    //           body: 'Чат ценителей JS',
    //           icon: 'https://findicons.com/files/icons/2083/go_green_web/64/live_chat.png',
    //           requireInteraction: true
    //         }
    //       );
    //       isNotice = false;
    //       notification.onclose = clickFunc;
    //     }
    //   }
    //   else if (Notification.permission !== 'denied') {
    //     Notification.requestPermission(function (permission) {
    //       if (permission === "granted") {
    //         if (document.hidden) {
    //           const notification = new Notification(
    //             "Бегом в чат! Есть непрочитанные сообщения!",
    //             {
    //               body: `Чат ценителей JS`,
    //               icon: 'https://findicons.com/files/icons/2083/go_green_web/64/live_chat.png',
    //               requireInteraction: true
    //             }
    //           );
    //           isNotice = false;
    //           notification.onclose = clickFunc;
    //         }
    //       }
    //     });
    //   }
    // } 
    
    // store.dispatch(connectWebsocket(URL));

    // ws.onopen = () => {
    //   console.log("connected");
    // };
    // ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   addMessage(message);
    //   if (isNotice) addNotification();
    // };
    // ws.onclose = () => {
    //   console.log("disconnected");
    //   clearMessages();
      // setWs(new WebSocket(URL));
    // };
    // return () => {
    //   try {
    //     ws.close();
    //   } catch (error) {
    //     console.log("error: ", error);
    //   }
    // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
   
  const submitMessage = (messageString) => {
    const message = { from: name, message: messageString };
    store.dispatch(send(message));
  }

  return (
    // <div>
    //   <label htmlFor="name">
    //     Name:&nbsp;
    //     <input
    //       type="text"
    //       id={"name"}
    //       placeholder={"Enter your name..."}
    //       value={name}
    //       onChange={event => setName(event.target.value)}
    //     />
    //   </label>
    <div>
      {!name && <Redirect to="/" />}
      <button onClick={() => {
        loginOut();
        clearMessages();
        store.dispatch(disconnect());
        // try {
        //   ws.close();
        // } catch (error) {
        //   console.log("error: ", error);
        // }
        }}> Sign out </button>
      <ChatInput
        // ws={ws}
        onSubmitMessage={messageString => submitMessage(messageString)}
      />
      {messages.map(message => (
        <ChatMessage
          key={message.id}
          message={message.message}
          name={message.from}
          time={DateTime.fromMillis(message.time).toLocaleString(
            DateTime.DATETIME_SHORT_WITH_SECONDS
          )}
        />
      ))}
    </div>
  );
}

const mapStateToProps = ({ name, messages }) => {
  return {
    name,
    messages
  }
}

const mapsDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => {dispatch(addMessageAction(message))},
    loginOut: () => {dispatch(loginOutAction())},
    clearMessages: () => {dispatch(clearMessagesAction())}
  }
}

const Chat  = connect (
  mapStateToProps,
  mapsDispatchToProps
)(ChatBox);

ChatBox.propTypes = {
  messages: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  loginOut: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired
};

export default Chat;
