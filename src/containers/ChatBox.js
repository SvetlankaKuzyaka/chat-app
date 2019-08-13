// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import { DateTime } from "luxon";
// import { createStore } from "redux";
import { connect } from "react-redux";

import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
// import reducer from "../store/reducer";
import { addMessageAction } from '../store/actions';

const URL = "ws://st-chat.shas.tel";
// const initialState = [];
// const store = createStore(reducer, initialState);

class ChatBox extends Component {
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
      // this.addMessage(message);
      this.props.addMessage(message);

      // store.dispatch({
      //   type: 'ADD_MESSAGE',
      //   message,
      // });
      // console.log(store.getState());
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // this.setState({
      //   ws: new WebSocket(URL)
      // });
    };
  }

  // componentWillUnmount() {
  //   try {
  //     this.ws.close();
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // }

  // addMessage = message =>
  //   this.setState(state => ({ messages: [...message, ...state.messages] }));

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
        {/* {this.state.messages.map(message => ( */}
        {this.props.messages.map(message => (
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
}

const mapStateToProps = ({ messages }) => {
  return {
    messages,
  }
}

const mapsDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => {
      dispatch(addMessageAction(message))
    }
  }
}

export default connect (
  mapStateToProps,
  mapsDispatchToProps
)(ChatBox);

// export default Chat;

// const Chat = () => {
//   const [name, setName] = useState('Kuzya');
//   const [messageHistory, setMessageHistory] = useState([]);
//   const [ws, setWs] = useState(new WebSocket(URL)); 

//   useEffect(() => {
//     ws.onopen = () => {
//       console.log("connected");
//     };
//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       setMessageHistory([...message, ...messageHistory]);   
//     };
//     ws.onclose = () => {
//       console.log("disconnected");
//       setWs(new WebSocket(URL));
//     };
//     return () => {
//       try {
//         ws.close();
//       } catch (error) {
//         console.log("error: ", error);
//       }
//     };
//   }, []);
   
//   const submitMessage = (messageString) => {
//     const message = { from: name, message: messageString };
//     ws.send(JSON.stringify(message));
//     console.log(messageHistory);
//   }

//   return (
//     <div>
//       <label htmlFor="name">
//         Name:&nbsp;
//         <input
//           type="text"
//           id={"name"}
//           placeholder={"Enter your name..."}
//           value={name}
//           onChange={event => setName(event.target.value)}
//         />
//       </label>
//       <ChatInput
//         ws={ws}
//         onSubmitMessage={messageString => submitMessage(messageString)}
//       />
//       {messageHistory.map(message => (
//         <ChatMessage
//           key={message.id}
//           message={message.message}
//           name={message.from}
//           time={DateTime.fromMillis(message.time).toLocaleString(
//             DateTime.DATETIME_SHORT_WITH_SECONDS
//           )}
//         />
//       ))}
//     </div>
//   );
// }

// export default Chat;
