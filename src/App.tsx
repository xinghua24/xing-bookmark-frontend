import React from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {},
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="md">
          <Switch>
            <Route path="/signin" exact>
              <Signin />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/verifySignup" exact>
              <VerifySignup />
            </Route>
            <Route path="/confirmsignup" exact>
              <ConfirmSignup />
            </Route>
            <Route path="/changepassword" exact>
              <ChangePassword />
            </Route>
            <Route path="/changepasswordconfirm" exact>
              <ChangePasswordConfirm />
            </Route>
            <Route path="/forgetpassword" exact>
              <ForgetPassword />
            </Route>
            <Route path="/forgetpasswordverification" exact>
              <ForgetPasswordVerification />
            </Route>
            <Route path="/welcome" exact>
              <Welcome />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
