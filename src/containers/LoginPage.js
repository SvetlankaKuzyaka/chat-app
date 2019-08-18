import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Typography, TextField } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import { setLoginAction } from "../store/actions";

const useStyles = makeStyles({
  root: {
    margin: "20vh auto",
    width: "20%"
  },
  input: {
    width: "100%"
  }
});

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important"
    }
  }
})(TextField);

const LoginPage = ({ name, setLogin }) => {
  const styles = useStyles();
  const login = window.localStorage.getItem("login");
  const [input, setInput] = useState(`${login ? login : "Kuzya"}`);

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (input) {
      setLogin(input);
      window.localStorage.setItem("login", input);
    }
  };

  return (
    <>
      {name && <Redirect to="/chat" />}
      <Header title="Welcome to chat !" />
      <Typography component="div" className={styles.root}>
        <form onSubmit={handleSubmit}>
          <ValidationTextField
            className={styles.input}
            label="Name"
            placeholder="Enter your name..."
            required
            value={input}
            variant="outlined"
            onChange={handleChange}
            id="validation-outlined-input"
          />
        </form>
      </Typography>
    </>
  );
};

const mapStateToProps = ({ name }) => {
  return {
    name
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    setLogin: name => {
      dispatch(setLoginAction(name));
    }
  };
};

const Login = connect(
  mapStateToProps,
  mapsDispatchToProps
)(LoginPage);

LoginPage.propTypes = {
  name: PropTypes.string.isRequired,
  setLogin: PropTypes.func.isRequired
};

export default Login;
