import React from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    color: "#FFF",
    backgroundColor: "#FF5722"
  },
  equalavatar: {
    margin: 10,
    color: "#FFF",
    backgroundColor: "#3F51B5"
  },
  inline: {
    display: "inline"
  },
  text: {
    wordWrap: "break-word",
	  wordBreak: "break-all"
  },
  listitem: {
    alignItems: "flex-start",
    "&:hover": {
      backgroundColor: "#EEEEEE"
    }
  }
});

const ChatMessage = ({ name, message, time }) => {
  const styles = useStyles();
  const author = useSelector(state => state.name);

  return (
    <>
      <ListItem className={styles.listitem}>
        <ListItemAvatar>
          <Avatar className={author===name ? styles.equalavatar : styles.avatar}>
            {name.substring(0, 2)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          className={styles.text}
          primary={time}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={styles.inline}
                color="textPrimary"
              >
                {`${name}: `}
              </Typography>
              {message}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

ChatMessage.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};

export default ChatMessage;
