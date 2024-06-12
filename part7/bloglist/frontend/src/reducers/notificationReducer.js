import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: "",
  },
  reducers: {
    notificationChange(state, action) {
      setTimeout(() => {}, action.payload.duration);
      return action.payload;
    },
  },
});

export const { notificationChange } = notificationSlice.actions;

export const setNotification = (notification, duration) => async (dispatch) => {
  dispatch(notificationChange({ notification, duration }));

  setTimeout(() => {
    dispatch(
      notificationChange({
        notification: { message: "", type: "" },
        duration: 0,
      })
    );
  }, duration);
};

export default notificationSlice.reducer;
