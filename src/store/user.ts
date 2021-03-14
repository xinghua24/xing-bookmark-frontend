import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import { LoginType } from "./LoginType";

const slice = createSlice({
  name: "username",
  initialState: {
    username: null,
    loginType: null,
    isLoading: true,
  },
  reducers: {
    loadComplete: (state) => {
      state.isLoading = false;
    },
    loginSuccess: (state, action) => {
      state.username = action.payload.username;
      state.loginType = action.payload.loginType;
      state.isLoading = false;
    },
    logoutSuccess: (state) => {
      state.username = null;
    },
  },
});

// async action
export function loadUser() {
  return async (dispatch: any) => {
    try {
      const user = await Auth.currentUserPoolUser();
      const isIdentityLogin = !!(await (
        await Auth.currentSession()
      ).getIdToken().payload.identities);

      console.log(
        "idToken payload" +
          JSON.stringify(
            await (await Auth.currentSession()).getIdToken().payload,
            null,
            2
          )
      );
      console.log("isIdentityLogin " + isIdentityLogin);

      const loginType = isIdentityLogin
        ? LoginType.IDENTITY
        : LoginType.USERNAME_PASSWORD;
      if (!!user) {
        dispatch(
          loginSuccess({ username: user.username, loginType: loginType })
        );
      }
    } catch (error) {
      // no login user yet
      dispatch(loadComplete());
    }
  };
}

export function userSignOut() {
  return async (dispatch: any) => {
    try {
      await Auth.signOut();
      dispatch(logoutSuccess());
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
}

export const { loginSuccess, logoutSuccess, loadComplete } = slice.actions;
export default slice.reducer;
