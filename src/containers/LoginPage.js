import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { setLoginAction } from '../store/actions';

const LoginPage = ({ name, setLogin }) => {
    const [input, setInput] = useState('');
    // const login = window.localStorage.getItem('login');
    // if (login) setInput(login);
    const handleChange = (event) => {
        setInput(event.target.value)
        // window.localStorage.setItem('login', event.target.value);
    }
    const handleClick = () => {
        if (input) setLogin(input);
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