import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { setLoginAction } from '../store/actions';
import store from "../store/store";
import { connect as connectWebsocket } from '@giantmachines/redux-websocket';
import addNotification from "../utils/notification";

const URL = "ws://st-chat.shas.tel";

const LoginPage = ({ name, setLogin }) => {
    const login = window.localStorage.getItem('login');
    const [input, setInput] = useState(`${login ? login : ''}`);
    // const login = window.localStorage.getItem('login');
    // if (login) setInput(login);
    const handleChange = (event) => {
        setInput(event.target.value)
    }

    let currentValue = [];
    function handleStoreChange() {
      let previousValue = [...currentValue];
      currentValue = [...store.getState().messages];
      if (previousValue.length !== currentValue.length) addNotification();
    }

    const handleClick = () => {
        if (input) setLogin(input);
        window.localStorage.setItem('login', input);
        store.dispatch(connectWebsocket(URL));
        store.subscribe(handleStoreChange);
    }
  
    return (       
        <div>
            {name && (
                <Redirect to="/chat" />
            )}
            <label htmlFor="name">
                Name:&nbsp;
                <input
                    type="text"
                    id={"name"}
                    placeholder={"Enter your name..."}
                    value={input}
                    onChange={handleChange}
                />
            </label>
            <button onClick={handleClick}>Sign in</button>
        </div>
    );
  }

  const mapStateToProps = ({ name }) => {
    return {
      name,
    }
  }
  
  const mapsDispatchToProps = (dispatch) => {
    return {
        setLogin: (name) => {
            dispatch(setLoginAction(name))
      }
    }
  }
  
  const Login  = connect (
    mapStateToProps,
    mapsDispatchToProps
  )(LoginPage);
  
  export default Login;