import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ChangePassword from "./components/ChangePassword";
import ChangePasswordConfirm from "./components/ChangePasswordConfirm";
import ForgetPassword from "./components/ForgetPassword";
import ForgetPasswordVerification from "./components/ForgetPasswordVerification";
import Welcome from "./components/Welcome";
import ConfirmSignup from "./components/ConfirmSignup";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import { Container } from "@material-ui/core";
import VerifySignup from "./components/VerifySignup";
import SecuredRoute from "./utilities/SecuredRoute";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/user";
import Home from "./components/Home";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {},
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="md">
          <Switch>
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/verifySignup" exact component={VerifySignup} />
            <Route path="/confirmsignup" exact component={ConfirmSignup} />
            <Route path="/forgetpassword" exact component={ForgetPassword} />
            <Route
              path="/forgetpasswordverification"
              exact
              component={ForgetPasswordVerification}
            />
            <SecuredRoute
              path="/changepassword"
              exact
              component={ChangePassword}
            />
            <SecuredRoute
              path="/changepasswordconfirm"
              exact
              component={ChangePasswordConfirm}
            />
            <SecuredRoute path="/home" exact component={Home} />
            <Route path="/welcome" exact component={Welcome} />
            {/* This Route with path "/" need to be the Lastest because it is not a exact match*/}
            <Route path="/" component={Welcome} />{" "}
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
