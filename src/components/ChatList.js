import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { List, Paper } from "@material-ui/core";

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
    backgroundColor: "#EEEEEE",
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
  }
});

const ChatList = ({ messages }) => {
  const styles = useStyles();

  return (
    <Paper className={styles.root}>
      <List className={styles.list}>
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
      </List>
    </Paper>
  );
};

ChatList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default ChatList;
