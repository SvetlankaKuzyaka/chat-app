import React, {useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { List, Paper } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

import ChatMessage from "./ChatMessage";

const useStyles = makeStyles({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "1em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,.05)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "1em",
      height: "15%"
    }
  },
  root: {
    width: "100%",
    height: "70vh",
    marginBottom: 20,
    padding: "1em",
    boxSizing: "border-box",
    overflow: "hidden",
    "&:hover": {
      overflow: "auto",
      overflowX: "hidden"
    }
  },
  list: {
    width: "100%"
  },
  div: {
    height: "5vh"
  },
  loader: {
    marginTop: "50%"
  }
});

const ChatList = ({ messages }) => {
  const styles = useStyles();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);

  const loader = (
    <div className={styles.loader}>
      <CircularProgress />
    </div>
  )

  return (
    <Paper className={styles.root}>
      <List className={styles.list}>
        {!messages.length && loader}
        {[...messages].reverse().map(message => (
          <ChatMessage
            key={message.id}
            message={message.message}
            name={message.from}
            time={DateTime.fromMillis(message.time).toLocaleString(
              DateTime.DATETIME_SHORT_WITH_SECONDS
            )}
          />
        ))}    
        <div className={styles.div} ref={messagesEndRef} />
      </List>
    </Paper>
  );
};

ChatList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default ChatList;
