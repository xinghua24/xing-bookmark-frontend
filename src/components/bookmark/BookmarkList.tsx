import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { loadBookmarks } from "../../store/bookmarks";
import { Bookmark } from "../../model/Bookmark";

function BookmarkList() {
  const dispatch = useDispatch();
  const bookmarks: Bookmark[] = useSelector(
    (state: any) => state.bookmarks.bookmarks
  );

  useEffect(() => {
    dispatch(loadBookmarks());
  }, []);

  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(10, 0, 6),
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="main">
      <p>BookmarkList</p>
      {JSON.stringify(bookmarks, null, 2)}
    </Container>
  );
}

export default BookmarkList;
