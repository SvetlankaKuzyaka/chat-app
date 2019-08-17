import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  setLoginAction,
  connectWebsocket,
  clearMessagesOfflineAction
} from "../store/actions";
import store from "../store/store";
// import { connect as connectWebsocket } from "@giantmachines/redux-websocket";
// import addNotification from "../utils/notification";

const URL = "ws://st-chat.shas.tel";

const LoginPage = ({
  name,
  setLogin,
  connectWesocket,
  clearMessagesOffline,
  messagesOffline,
  socket
}) => {
  const login = window.localStorage.getItem("login");
  const [input, setInput] = useState(`${login ? login : ""}`);
  // const login = window.localStorage.getItem('login');
  // if (login) setInput(login);

  let isNotice = true;
  function addNotification() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      if (document.hidden) {
        const notification = new Notification(
          "Бегом в чат! Есть непрочитанные сообщения!",
          {
            body: "Чат ценителей JS",
            icon:
              "https://findicons.com/files/icons/2083/go_green_web/64/live_chat.png",
            requireInteraction: true
          }
        );
        isNotice = false;
        notification.onclose = () => {
          isNotice = true;
        };
      }
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function(permission) {
        if (permission === "granted") {
          if (document.hidden) {
            const notification = new Notification(
              "Бегом в чат! Есть непрочитанные сообщения!",
              {
                body: `Чат ценителей JS`,
                icon:
                  "https://findicons.com/files/icons/2083/go_green_web/64/live_chat.png",
                requireInteraction: true
              }
            );
            isNotice = false;
            notification.onclose = () => {
              isNotice = true;
            };
          }
        }
      });
    }
  }

  const handleChange = event => {
    setInput(event.target.value);
  };

  let currentValue = [];
  function handleStoreChange() {
    let previousValue = [...currentValue];
    currentValue = [...store.getState().messages];
    if (currentValue.length > previousValue.length && isNotice) {
      addNotification();
    }
  }

  const handleClick = () => {
    if (input) setLogin(input);
    window.localStorage.setItem("login", input);
    // store.dispatch(connectWebsocket(URL));
    connectWesocket(URL);
    store.subscribe(handleStoreChange);
  };

  return (
    <div>
      {name && <Redirect to="/chat" />}
      <label htmlFor="name">
        Name:&nbsp;
        <input
          type="text"
          id={"name"}
          placeholder={"Enter your name..."}
          value={input}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleClick}>Sign in</button>
    </div>
  );
};

const mapStateToProps = ({ name, messagesOffline, socket }) => {
  return {
    name,
    messagesOffline,
    socket
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    setLogin: name => {
      dispatch(setLoginAction(name));
    },
    connectWesocket: URL => {
      dispatch(connectWebsocket(URL));
    },
    clearMessagesOffline: () => {
      dispatch(clearMessagesOfflineAction());
    }
  };
};

const Login = connect(
  mapStateToProps,
  mapsDispatchToProps
)(LoginPage);

export default Login;
