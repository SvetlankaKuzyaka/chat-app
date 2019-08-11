import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Chat from "../components/Chat";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Chat />
    </div>
  );
}

export default App;
