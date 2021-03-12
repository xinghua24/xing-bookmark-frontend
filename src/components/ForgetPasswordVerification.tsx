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
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

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
  resetCode: yup.string().required(),
  newPassword: yup.string().required(),
  confirmNewPassword: yup.string().required(),
});

const ForgetPasswordVerification: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  let email: string = params.email as string;

  const submitHandler = async (
    data: any,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);
    console.log("submit: ", data);
    try {
      await Auth.forgotPasswordSubmit(email, data.resetCode, data.newPassword);
      setSubmitting(false);
      history.push({
        pathname: "/welcome",
      });
    } catch (error) {
      setErrors(error);
      setSubmitting(false);
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h5">
          Password Reset
        </Typography>
        <p>Please enter the password reset code and a new password</p>
        <Formik
          initialValues={{
            resetCode: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className={classes.form}>
              <MyTextField placeholder="Password Reset Code" name="resetCode" />
              <MyTextField
                placeholder="New Password"
                name="newPassword"
                type="password"
              />
              <MyTextField
                placeholder="Confirm New Password"
                name="confirmNewPassword"
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
                Reset Password
              </Button>
              {"message" in errors ? (
                <div className={classes.error}>{errors["message"]}</div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default ForgetPasswordVerification;
