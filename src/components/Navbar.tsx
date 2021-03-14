import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button, IconButton, Link, Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../store/user";
import { AccountCircle } from "@material-ui/icons";
import { LoginType } from "../store/LoginType";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.user.username);
  const loginType = useSelector((state: any) => state.user.loginType);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  function signOut() {
    setAnchorEl(null);
    dispatch(userSignOut());
    history.push("/");
  }

  function handleChangePassword() {
    setAnchorEl(null);
    history.push("/changepassword");
  }

  const NavButtons = username ? (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {loginType === LoginType.USERNAME_PASSWORD && (
          <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        )}
        <MenuItem onClick={signOut}>Sign out</MenuItem>
      </Menu>
    </>
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
      <Container maxWidth="lg">
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
