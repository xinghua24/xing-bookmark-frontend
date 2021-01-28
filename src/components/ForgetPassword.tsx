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
import { useDispatch } from "react-redux";

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
  email: yup.string().email().required(),
});

const ForgetPassword: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler = async (data: any, { setSubmitting }: any) => {
    setSubmitting(true);
    console.log("submit: ", data);
    try {
      const result: any = await Auth.forgotPassword(data.email);
      setSubmitting(false);
      history.push({
        pathname: "/forgetpasswordverification",
        search: "?email=" + data.email,
      });
    } catch (error) {
      setSubmitting(false);
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h5">
          Forgot your password?
        </Typography>
        <p>
          Please enter the email address associated with your account and we'll
          email you a password reset code.
        </p>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className={classes.form}>
              <MyTextField placeholder="Email" name="email" />
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Send Reset Code
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

export default ForgetPassword;
