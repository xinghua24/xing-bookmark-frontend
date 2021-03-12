import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import { Bookmark } from "../model/Bookmark";

const slice = createSlice({
  name: "bookmarks",
  initialState: {
    isLoading: true,
    bookmarks: [] as Bookmark[],
    error: [] as string[],
  },
  reducers: {
    loadBookmarksStarted: (state) => {
      state.isLoading = true;
      state.bookmarks = [];
      state.error = [];
    },
    loadBookmarksSuccess: (state, action) => {
      state.isLoading = false;
      state.bookmarks = action.payload;
      state.error = [];
    },
    loadBookmarksFailure: (state, action) => {
      state.isLoading = false;
      state.bookmarks = [];
      state.error.push(action.payload);
    },
    deleteBookmark: (state, action) => {
      const newBookmarks = state.bookmarks.filter(
        (item) => item.bookmarkid !== action.payload
      );
      state.bookmarks = newBookmarks;
    },
  },
});

// async action
export function loadBookmarks() {
  return async (dispatch: any) => {
    try {
      dispatch(loadBookmarksStarted());
      const idToken = await (await Auth.currentSession())
        .getIdToken()
        .getJwtToken();
      const response = await fetch(`https://api.xingbookmark.com/bookmarks`, {
        method: "GET",
        headers: new Headers({
          Authorization: "" + idToken,
        }),
      });
      const data = await response.json();

      console.log(data);
      dispatch(loadBookmarksSuccess(data));
    } catch (error) {
      dispatch(loadBookmarksFailure(error));
    }
  };
}

// async action
export function deleteBookmarksAsync(id: number) {
  return async (dispatch: any) => {
    try {
      const idToken = await (await Auth.currentSession())
        .getIdToken()
        .getJwtToken();
      const response = await fetch(
        `https://api.xingbookmark.com/bookmarks/${id}`,
        {
          method: "DELETE",
          headers: new Headers({
            Authorization: "" + idToken,
          }),
        }
      );
      const data = await response.json();

      console.log(data);
      dispatch(deleteBookmark(id));
    } catch (error) {
      console.log(error);
    }
  };
}

export const {
  loadBookmarksStarted,
  loadBookmarksFailure,
  loadBookmarksSuccess,
  deleteBookmark,
} = slice.actions;

export default slice.reducer;
