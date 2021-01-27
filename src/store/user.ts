import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "username",
  initialState: {
    username: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload;
    },
    logoutSuccess: (state) => {
      state.username = null;
      console.log(state.username);
    },
  },
});

export const { loginSuccess, logoutSuccess } = slice.actions;
export default slice.reducer;
