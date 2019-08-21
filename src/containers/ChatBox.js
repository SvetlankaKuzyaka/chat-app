/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Helmet from "react-helmet";

import store from "../store/store";
import ChatInput from "../components/ChatInput";
import ChatList from "../components/ChatList";
import Header from "../components/Header";
import {
  loginOutAction,
  addMessageOfflineAction,
  clearMessagesOfflineAction,
  connectWebsocket,
  clearMessagesAction
} from "../store/actions";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    width: "30%",
    "@media (max-width:520px)": {
      width: "95%"
    },
    "@media (min-width:520px) and (max-width:1024px)": {
      width: "70%"
    }
  },
  button: {
    color: "inherit",
    fontSize: "0.8em",
    fontWeight: "bold"
  }
});

const URL = "wss://wssproxy.herokuapp.com/";

const ChatBox = ({
  name,
  messages,
  socket,
  loginOut,
  addMessageOffline,
  clearMessagesOffline,
  connectWesocket,
  clearMessages
}) => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (name) connectWesocket(URL);
  }, []);

  useEffect(() => {
    let isNotice = true;
    let notification = null;
    const createNotification = () => {
      if (document.hidden) {
        notification = new Notification(
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
    };
    function addNotification() {
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        createNotification();
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
          if (permission === "granted") {
            createNotification();
          }
        });
      }
    }
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        document.title = "ChatApp";
        if (notification) notification.close();
      }
    };
    let currentValue = [];
    function handleStoreChange() {
      let previousValue = [...currentValue];
      currentValue = [...store.getState().messages];
      if (
        isNotice &&
        previousValue.length &&
        currentValue.length > previousValue.length
      )
        addNotification();
      if (
        document.hidden &&
        previousValue.length &&
        currentValue.length > previousValue.length
      ) {
        document.title = "ChatApp - 𝐍𝐞𝐰 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬";
        document.addEventListener(
          "visibilitychange",
          handleVisibilityChange,
          false
        );
      }
    }
    const unsubscribe = store.subscribe(handleStoreChange);
    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      if (store.getState().socket && store.getState().messagesOffline.length) {
        store.getState().messagesOffline.forEach(element => {
          store.getState().socket.send(JSON.stringify(element));
        });
        clearMessagesOffline();
      }
    };
    const handleOffline = () => {
      setOffline(true);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const styles = useStyles();

  const submitMessage = messageString => {
    const message = { from: name, message: messageString };
    if (window.navigator.onLine) {
      socket.send(JSON.stringify(message));
    } else {
      addMessageOffline(message);
    }
  };

  const handleClick = () => {
    loginOut();
    clearMessages();
    if (socket.readyState === 1 || socket.readyState === 0) socket.close();
  };

  return (
    <>
      {!name && <Redirect to="/" />}
      {offline && <Helmet title="ChatApp - 𝐨𝐟𝐟𝐥𝐢𝐧𝐞" />}
      <Header title={`Chatting as ${name}`}>
        <Button className={styles.button} onClick={handleClick}>
          Log Out
        </Button>
      </Header>
      <Typography component="div" className={styles.root}>
        <ChatList messages={messages} />
        <ChatInput
          onSubmitMessage={messageString => submitMessage(messageString)}
        />
      </Typography>
    </>
  );
};

const mapStateToProps = ({ name, messages, socket, messagesOffline }) => {
  return {
    name,
    messages,
    socket
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    loginOut: () => {
      dispatch(loginOutAction());
    },
    addMessageOffline: message => {
      dispatch(addMessageOfflineAction(message));
    },
    clearMessagesOffline: () => {
      dispatch(clearMessagesOfflineAction());
    },
    connectWesocket: URL => {
      dispatch(connectWebsocket(URL));
    },
    clearMessages: URL => {
      dispatch(clearMessagesAction());
    }
  };
};

const Chat = connect(
  mapStateToProps,
  mapsDispatchToProps
)(ChatBox);

ChatBox.propTypes = {
  messages: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired,
  loginOut: PropTypes.func.isRequired,
  addMessageOffline: PropTypes.func.isRequired,
  clearMessagesOffline: PropTypes.func.isRequired,
  connectWesocket: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired
};

export default Chat;
