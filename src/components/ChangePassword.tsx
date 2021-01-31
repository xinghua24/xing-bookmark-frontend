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
  password: yup.string().required(),
  newPassword: yup.string().required("New password is a required field"),
  confirmNewPassword: yup
    .string()
    .required("Confirm new password is a required field"),
});

const ChangePassword: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const submitHandler = async (
    data: any,
    { setSubmitting, setErrors }: any
  ) => {
    if (!data.password || !data.newPassword || !data.confirmNewPassword) {
      return;
    } else if (data.newPassword !== data.confirmNewPassword) {
      setErrors({ message: "Password mismatch" });

      return;
    }

    setSubmitting(true);
    console.log("submit: ", data);
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, data.password, data.newPassword);

      history.push("/changepasswordconfirm");
    } catch (error) {
      setErrors(error);
      console.log("error changing password:", error);
    }
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className={classes.form}>
              <MyTextField
                placeholder="Password"
                name="password"
                type="password"
              />
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
                Change Password
              </Button>

              {"message" in errors ? (
                <div className={classes.error}>{errors["message"]}</div>
              ) : null}

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

export default ChangePassword;
