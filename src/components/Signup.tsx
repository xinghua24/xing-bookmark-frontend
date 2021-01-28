import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Form, Formik } from "formik";
import * as yup from "yup";
import MyTextField from "../formcontrols/MyTextField";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const submitHandler = async (data: any, { setSubmitting }: any) => {
    if (
      !data.password ||
      !data.confirmPassword ||
      data.password !== data.confirmPassword
    ) {
      return;
    }

    setSubmitting(true);
    console.log("submit: ", data);
    await signUp(data.username, data.password, data.email);
    setSubmitting(false);
  };

  async function signUp(username: string, password: string, email: string) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);

      history.push("/verifySignup");
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className={classes.form}>
              <MyTextField placeholder="Username" name="username" />

              <MyTextField placeholder="Email Address" name="email" />
              <MyTextField
                placeholder="Password"
                name="password"
                type="password"
              />

              <MyTextField
                placeholder="Confirm Password"
                name="confirmPassword"
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
                Sign Up
              </Button>

              <pre style={{ textAlign: "left" }}>
                {JSON.stringify(values, null, 2)}
              </pre>
              <pre style={{ textAlign: "left" }}>
                {JSON.stringify(errors, null, 2)}
              </pre>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
