import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Form, Formik } from "formik";
import * as yup from "yup";
import MyTextField from "../formcontrols/MyTextField";
import { Auth, Hub } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "#f00",
  },
}));

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Signin: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log(data);
          break;
        case "signOut":
          console.log("signout");
          break;
        case "customOAuthState":
          console.log("customOAuthState");
      }
    });
  });

  const submitHandler = async (
    data: any,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);
    console.log("submit: ", data);
    try {
      const user = await Auth.signIn(data.username, data.password);
      console.log(user);
      await dispatch(loginSuccess(user.username));
      setSubmitting(false);
      history.push("/");
    } catch (error) {
      setErrors(error);
      setSubmitting(false);
    }
  };

  const handleGoogleSignin = async (event: any) => {
    event.preventDefault();
    Auth.federatedSignIn({ customProvider: "Google" });
  };
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className={classes.form}>
              <MyTextField placeholder="Username" name="username" />
              <MyTextField
                placeholder="Password"
                name="password"
                type="password"
              />

              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Sign in
              </Button>

              <div>
                <Link href="/forgetpassword" variant="body2">
                  Forgot password?
                </Link>
              </div>
              <div>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </div>
              <div>
                <Link href="" variant="body2" onClick={handleGoogleSignin}>
                  Try Sign In with Google
                </Link>
              </div>

              {"message" in errors ? (
                <div className={classes.error}>{errors["message"]}</div>
              ) : null}

              {/* <pre style={{ textAlign: "left" }}>
                {JSON.stringify(values, null, 2)}
              </pre>
              <pre style={{ textAlign: "left" }}>
                {JSON.stringify(errors, null, 2)}
              </pre> */}
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Signin;
