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
      const response = await fetch(`https://api.xinghuatest.com/bookmarks`, {
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

export const {
  loadBookmarksStarted,
  loadBookmarksFailure,
  loadBookmarksSuccess,
} = slice.actions;

export default slice.reducer;
