import React from "react";
import { Switch, Route } from "react-router-dom";
import Helmet from "react-helmet"
import "./App.css";

import ChatBox from "./containers/ChatBox";
import LoginPage from "./containers/LoginPage";

function App() {
  return (
    <div className="App">
      <Helmet
        title="ChatApp"
        meta={[
          {"name": "description", "content": "The chat is a final task of RSS"}
        ]}
      />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/chat" component={ChatBox} />
      </Switch>
    </div>
  );
}

export default App;
