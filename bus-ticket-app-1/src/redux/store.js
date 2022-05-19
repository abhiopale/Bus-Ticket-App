import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/slices/adminSignUpSlice";
import userReducer from "../redux/slices/userSignUpSlice";
import adminSignInReducer from "./slices/adminSignInSlice";
import userSignInReducer from "./slices/userSignInSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    adminSign: adminSignInReducer,
    userSignIn: userSignInReducer,
  },
});

export default store;
