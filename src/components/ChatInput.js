import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, InputBase, IconButton, Divider, Box } from "@material-ui/core";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SendIcon from "@material-ui/icons/Send";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

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
  },
  picker: {
    position: "absolute",
    bottom: "25%",
    right: "35%"
  }
});

const ChatInput = ({ onSubmitMessage }) => {
  const styles = useStyles();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleChange = event => setMessage(event.target.value);
  const handleSubmit = event => {
    event.preventDefault();
    if (message.trim()) {
      onSubmitMessage(message);
      setMessage("");
    }
  };

  const emojiPicker = useRef(null);
  const showIcon = useRef(null);

  const handleEmojiClick = e => {
    let emoji = e.native;
    setMessage(message + emoji);
  };

  const closeEmojis = event => {
    if (
      emojiPicker !== null &&
      !emojiPicker.current.contains(event.target) &&
      !showIcon.current.contains(event.target)
    ) {
      setShow(false);
      document.removeEventListener("click", closeEmojis);
    }
  };

  const showEmojis = () => {
    if (!show) {
      setShow(true);
      document.addEventListener("click", closeEmojis);
    }
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
        {show && (
          <Box className={styles.picker} ref={emojiPicker}>
            <Picker onSelect={handleEmojiClick} />
          </Box>
        )}
        <IconButton
          className={styles.iconButton}
          aria-label="emoji"
          onClick={showEmojis}
          ref={showIcon}
        >
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
