import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Welcome: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(10, 0, 6),
    },
  }));

  const classes = useStyles();

  return isLoading ? null : !isLoading && username ? (
    <Redirect to="/home" />
  ) : (
    <Container maxWidth="lg" component="main" className={classes.heroContent}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Welcome to Xing's Bookmark
      </Typography>
    </Container>
  );
};

export default Welcome;
