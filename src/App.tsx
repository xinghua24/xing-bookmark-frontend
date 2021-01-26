import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ChangePassword from "./components/ChangePassword";
import ChangePasswordConfirm from "./components/ChangePasswordConfirm";
import ForgetPassword from "./components/ForgetPassword";
import ForgetPasswordVerification from "./components/ForgetPasswordVerification";
import Welcome from "./components/Welcome";
import ConfirmSignup from "./components/ConfirmSignup";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/confirmsignup" exact>
            <ConfirmSignup />
          </Route>
          <Route path="/changepassword" exact>
            <ChangePassword />
          </Route>
          <Route path="/changepasswordconfirm exact">
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
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
