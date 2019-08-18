import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import ChatBox from "./containers/ChatBox";
import LoginPage from "./containers/LoginPage";

function App({ name }) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/chat" component={ChatBox} />
      </Switch>
    </div>
  );
}

export default App;
