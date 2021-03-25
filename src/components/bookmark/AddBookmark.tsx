import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Form, Formik } from "formik";
import * as yup from "yup";
import MyTextField from "../../formcontrols/MyTextField";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { Bookmark } from "../../model/Bookmark";

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
  url: yup.string().required(),
  description: yup.string(),
});

const AddBookmark: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const username = useSelector((state: any) => state.user.username);

  const submitHandler = async (
    data: any,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);
    console.log("submit: ", data);

    let urlWithProtocol = "";
    if (!data.url.startsWith("http")) {
      urlWithProtocol = "https://" + data.url;
    } else {
      urlWithProtocol = data.url;
    }

    const idToken = await (await Auth.currentSession())
      .getIdToken()
      .getJwtToken();
    let newBookmark: Bookmark = {
      description: data.description,
      url: urlWithProtocol,
      userid: username,
    };
    await fetch(`/api/bookmarks`, {
      method: "POST",
      headers: new Headers({
        Authorization: "" + idToken,
      }),
      body: JSON.stringify(newBookmark),
    });

    try {
      setSubmitting(false);
      history.push("/");
    } catch (error) {
      setErrors(error);
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          initialValues={{ url: "", description: "" }}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className={classes.form}>
              <MyTextField placeholder="URL" name="url" />
              <MyTextField placeholder="Description" name="description" />
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Add
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

export default AddBookmark;
