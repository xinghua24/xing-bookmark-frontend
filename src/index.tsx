import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Amplify from "aws-amplify";
import { Provider } from "react-redux";
import store from "./store";

Amplify.configure({
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: process.env.REACT_APP_USERPOOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_USERPOOL_WEB_CLIENT_ID,
  oauth: {
    domain:
      "bookmark-wiotufh392239hyr9hfbnv93232.auth.us-east-1.amazoncognito.com",
    scope: ["email", "profile", "openid"],
    redirectSignIn: "https://xingbookmark.com/signin",
    redirectSignOut: "https://xingbookmark.com",
    responseType: "code",
  },
});
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
