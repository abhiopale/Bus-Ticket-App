import { createSlice } from "@reduxjs/toolkit";

const axios = require("axios").default;

export const userSignInSlice = createSlice({
  name: "userSignIn",

  initialState: {
    user: {
      email: "",
      password: "",
    },
  },
  reducers: {
    userSignIn: (state, action) => {
      state.user = action.payload;
      axios
        .post("http://localhost:5000/user/login", {
          email: state.user.email,
          password: state.user.password,
        })
        .then((res) => {
          let token = res.data.result.token;
          localStorage.setItem("token", token);
        })
        .catch((err) => console.log(err));
    },
  },
});

export const { userSignIn } = userSignInSlice.actions;

export const selectAdmin = (state) => state.user.user;

export default userSignInSlice.reducer;
