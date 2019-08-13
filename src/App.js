import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatBox from "./containers/ChatBox";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <ChatBox/>
    </div>
  );
}

export default App;
