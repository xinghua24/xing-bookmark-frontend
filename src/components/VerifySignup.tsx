import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

function VerifySignup() {
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(10, 0, 6),
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="main" className={classes.heroContent}>
      <Typography
        component="h3"
        variant="h5"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Please verify your email address to complete the signup process!
      </Typography>
    </Container>
  );
}

export default VerifySignup;
