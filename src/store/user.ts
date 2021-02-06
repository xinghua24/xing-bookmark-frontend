import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";

const slice = createSlice({
  name: "username",
  initialState: {
    username: null,
    isLoading: true,
  },
  reducers: {
    loadComplete: (state) => {
      state.isLoading = false;
    },
    loginSuccess: (state, action) => {
      state.username = action.payload;
      state.isLoading = false;
    },
    logoutSuccess: (state) => {
      state.username = null;
      console.log(state.username);
    },
  },
});

// async action
export function loadUser() {
  return async (dispatch: any) => {
    try {
      const user = await Auth.currentUserPoolUser();
      if (!!user) {
        dispatch(loginSuccess(user.username));
      }
    } catch (error) {
      // no login user yet
      dispatch(loadComplete());
    }
  };
}

export const { loginSuccess, logoutSuccess, loadComplete } = slice.actions;
export default slice.reducer;
