import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const history = useHistory();
  const username = useSelector((state: any) => state.user.username);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      paddingLeft: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  const NavButtons = username ? (
    <Button
      color="inherit"
      onClick={() => {
        history.push("/signout");
      }}
    >
      Signout
    </Button>
  ) : (
    <>
      <Button
        color="inherit"
        onClick={() => {
          history.push("/signin");
        }}
      >
        Signin
      </Button>
      <Button
        color="inherit"
        onClick={() => {
          history.push("/signup");
        }}
      >
        Signup
      </Button>
    </>
  );
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            <Link
              color="inherit"
              underline="none"
              href="#"
              onClick={() => history.push("/")}
            >
              Bookmarks
            </Link>
          </Typography>
          {NavButtons}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;