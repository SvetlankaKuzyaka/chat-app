import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  appBar: {
    backgroundColor: "#616161",
    color: "#ffffff",
    '@media (max-width:520px)': {
      fontSize: "0.8rem"
    },
  },
  title: {
    color: "#FF5722",
    fontWeight: "bold",
    fontSize: "1.5em",
    flexGrow: 1
  }
});

const Header = ({ children, title }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Typography edge="start" variant="h6" className={styles.title}>
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired
};

Header.defaultProps = {
  children: null
};

export default Header;
