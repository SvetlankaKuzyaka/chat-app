import React from "react";
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
    color: "#fff",
    backgroundColor: "#FF5722"
  },
  inline: {
    display: "inline"
  }
});

const ChatMessage = ({ name, message, time }) => {
  const styles = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={styles.avatar}>{name.substring(0, 2)}</Avatar>
        </ListItemAvatar>
        <ListItemText
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
