import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkList from "./bookmark/BookmarkList";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

function Home() {
  const useStyles = makeStyles((theme) => ({
    addButton: {
      margin: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const history = useHistory();

  const handleAddBookmark = () => {
    history.push("/addbookmark");
  };
  return (
    <>
      <BookmarkList />
      <Button
        variant="outlined"
        size="small"
        className={classes.addButton}
        onClick={handleAddBookmark}
      >
        <AddIcon fontSize="small" />
        Create New
      </Button>
    </>
  );
}

export default Home;
