import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

function Welcome() {
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(10, 0, 6),
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="main">
      <p>Home</p>
    </Container>
  );
}

export default Welcome;
