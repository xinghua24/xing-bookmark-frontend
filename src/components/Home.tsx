import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkList from "./bookmark/BookmarkList";

function Home() {
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(10, 0, 6),
    },
  }));

  const classes = useStyles();

  return <BookmarkList />;
}

export default Home;
