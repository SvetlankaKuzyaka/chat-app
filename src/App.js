import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import ChatBox from "./containers/ChatBox";
import LoginPage from "./containers/LoginPage";

function App() {
  const [auth] = useState(true);
  function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          authed === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute authed={auth} path="/chat" component={ChatBox} />
        {/* <Route path='/chat' component={({ location })=> 
          auth ? (
            <ChatBox />
          ) : (
            <Redirect 
              to={{
                pathname: "/",
                state: {from : location}
              }}
            />
          )
        }/> */}
      </Switch>
    </div>
  );
}

export default App;
