import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, InputBase, IconButton, Divider } from "@material-ui/core";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    boxSizing: "border-box"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

const ChatInput = ({ onSubmitMessage }) => {
  const styles = useStyles();
  const [message, setMessage] = useState("");
  const handleChange = event => setMessage(event.target.value);
  const handleSubmit = event => {
    event.preventDefault();
    onSubmitMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={styles.root}>
        <InputBase
          className={styles.input}
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={handleChange}
          inputProps={{ "aria-label": "message" }}
        />
        <IconButton className={styles.iconButton} aria-label="emoji">
          <SentimentSatisfiedAltIcon />
        </IconButton>
        <Divider className={styles.divider} />
        <IconButton
          color="primary"
          className={styles.iconButton}
          aria-label="send"
          type="submit"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </form>
  );
};

ChatInput.propTypes = {
  onSubmitMessage: PropTypes.func.isRequired
};

export default ChatInput;
