import React from "react";
import PropTypes from 'prop-types';

const ChatMessage =  ({ name, message, time }) => (
  <p>
    <strong>{name}</strong> <em>{message}</em> <em>{time}</em>
  </p>
);

ChatMessage.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default ChatMessage;
