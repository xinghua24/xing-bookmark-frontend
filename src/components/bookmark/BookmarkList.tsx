import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loadBookmarks } from "../../store/bookmarks";
import { Bookmark } from "../../model/Bookmark";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { deleteBookmark, deleteBookmarksAsync } from "../../store/bookmarks";
import { useHistory } from "react-router-dom";

function BookmarkList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const bookmarks: Bookmark[] = useSelector(
    (state: any) => state.bookmarks.bookmarks
  );

  useEffect(() => {
    dispatch(loadBookmarks());
  }, []);

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: "100%",
    },
    main: {
      marginTop: theme.spacing(2),
      padding: 0,
    },
    link: {
      textDecoration: "none",
    },
  }));

  const handleEditBookmark = (bookmark: Bookmark) => {
    history.push({
      pathname: "/editbookmark",
      state: bookmark,
    });
  };
  const handleDeleteBookmark = (id: number) => {
    dispatch(deleteBookmarksAsync(id));
  };
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.main}>
      <Paper elevation={0} className={classes.paper}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Bookmark</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookmarks
                ? bookmarks.map((bookmark) => (
                    <TableRow key={bookmark.bookmarkid} hover={true}>
                      <TableCell component="th" scope="row">
                        <a
                          href={bookmark.url}
                          color="primary"
                          className={classes.link}
                        >
                          {bookmark.description}
                        </a>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditBookmark(bookmark)}
                        >
                          <EditIcon fontSize="small" />
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            handleDeleteBookmark(bookmark.bookmarkid || -1)
                          }
                        >
                          <DeleteIcon fontSize="small" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default BookmarkList;
