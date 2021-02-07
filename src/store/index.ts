import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./user";
import bookmarks from "./bookmarks";
const reducer = combineReducers({
  // here we will be adding reducers
  user,
  bookmarks,
});
const store = configureStore({
  reducer,
});
export default store;
