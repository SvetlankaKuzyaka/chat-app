/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import store from "../store/store";
import ChatInput from "../components/ChatInput";
import ChatList from "../components/ChatList";
import Header from "../components/Header";
import {
  loginOutAction,
  addMessageOfflineAction,
  clearMessagesOfflineAction,
  connectWebsocket
} from "../store/actions";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    width: "30%"
  }
});

const URL = "ws://st-chat.shas.tel";

const ChatBox = ({
  name,
  messages,
  socket,
  loginOut,
  addMessageOffline,
  clearMessagesOffline,
  connectWesocket
}) => {
  useEffect(() => {
    if (name) connectWesocket(URL);
  }, []);

  useEffect(() => {
    let isNotice = true;
    let currentValue = [];
    const createNotification = () => {
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
    };
    function handleStoreChange() {
      let previousValue = [...currentValue];
      currentValue = [...store.getState().messages];
      if (
        isNotice &&
        previousValue.length &&
        currentValue.length > previousValue.length
      )
        addNotification();
    }
    const unsubscribe = store.subscribe(handleStoreChange);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      if (store.getState().socket && store.getState().messagesOffline.length) {
        store.getState().messagesOffline.forEach(element => {
          store.getState().socket.send(JSON.stringify(element));
        });
        clearMessagesOffline();
      }
    };
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
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
    if (socket.readyState === 1 || socket.readyState === 0) socket.close();
  };

  return (
    <>
      {!name && <Redirect to="/" />}
      <Header title={`Chatting as ${name}`}>
        <Button color="inherit" onClick={handleClick}>
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
  connectWesocket: PropTypes.func.isRequired
};

export default Chat;
