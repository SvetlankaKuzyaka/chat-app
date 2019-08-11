import React from "react";

export default ({ name, message, time }) => (
  <p>
    <strong>{name}</strong> <em>{message}</em> <em>{time}</em>
  </p>
);
