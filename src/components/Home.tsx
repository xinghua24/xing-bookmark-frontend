import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import { Auth } from "aws-amplify";
import BookmarkList from "./bookmark/BookmarkList";

function Welcome() {
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(10, 0, 6),
    },
  }));

  const classes = useStyles();

  return <BookmarkList />;
}

export default Welcome;
