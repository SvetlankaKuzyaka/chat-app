import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const URL = "ws://st-chat.shas.tel";

const Chat = () => {
  const [name, setName] = useState('Kuzya');
  const [messageHistory, setMessageHistory] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL)); 

  useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessageHistory([...message, ...messageHistory]);   
    };
    ws.onclose = () => {
      console.log("disconnected");
      setWs(new WebSocket(URL));
    };
    return () => {
      try {
        ws.close();
      } catch (error) {
        console.log("error: ", error);
      }
    };
  }, []);
   
  const submitMessage = (messageString) => {
    const message = { from: name, message: messageString };
    ws.send(JSON.stringify(message));
    console.log(messageHistory);
  }

  return (
    <div>
      <label htmlFor="name">
        Name:&nbsp;
        <input
          type="text"
          id={"name"}
          placeholder={"Enter your name..."}
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </label>
      <ChatInput
        ws={ws}
        onSubmitMessage={messageString => submitMessage(messageString)}
      />
      {messageHistory.map(message => (
        <ChatMessage
          key={message.id}
          message={message.message}
          name={message.from}
          time={DateTime.fromMillis(message.time).toLocaleString(
            DateTime.DATETIME_SHORT_WITH_SECONDS
          )}
        />
      ))}
    </div>
  );
}

export default Chat;
