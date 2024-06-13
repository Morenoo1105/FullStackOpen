import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import storageService from "../services/storage";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const user = await storageService.loadUser();
    dispatch(setUser(user));
  };
};

export const logUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    storageService.saveUser(user);
    dispatch(setUser(user));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    storageService.removeUser();
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
