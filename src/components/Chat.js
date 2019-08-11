import React, { Component } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const URL = "ws://st-chat.shas.tel";

class Chat extends Component {
  state = {
    name: "Kuzya",
    messages: []
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected");
    };

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      console.log(message);
      this.addMessage(message);
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      this.setState({
        ws: new WebSocket(URL)
      });
    };
  }

  addMessage = message =>
    this.setState(state => ({ messages: [...message, ...state.messages] }));

  submitMessage = messageString => {
    const message = { from: this.state.name, message: messageString };
    this.ws.send(JSON.stringify(message));
  };

  render() {
    return (
      <div>
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={"name"}
            placeholder={"Enter your name..."}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <ChatInput
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
        {this.state.messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message.message}
            name={message.from}
          />
        ))}
      </div>
    );
  }
}

export default Chat;
