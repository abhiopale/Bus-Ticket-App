import { createSlice } from "@reduxjs/toolkit";

const axios = require("axios").default;

export const adminSignInSlice = createSlice({
  name: "adminSignIn",

  initialState: {
    admin: {
      email: "",
      password: "",
      authToken: "",
    },
  },
  reducers: {
    adminSignIn: (state, action) => {
      state.admin.email = action.payload.email;
      state.admin.password = action.payload.password;
      axios
        .post("http://localhost:5000/admin/login", {
          email: state.admin.email,
          password: state.admin.password,
        })
        .then((res) => {
          let token = res.data.result.token;
          localStorage.setItem("token", token);
        })
        .catch((err) => console.log(err));
    },
  },
});

export const { adminSignIn } = adminSignInSlice.actions;

export const selectAdmin = (state) => state.admin.admin;

export default adminSignInSlice.reducer;
