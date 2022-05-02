import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { adminSignIn } from "../redux/slices/adminSignInSlice";

import { useNavigate } from "react-router-dom";

import Footer from "./footer";

const axios = require("axios").default;

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/admin/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          let token = res.data.result.token;
          localStorage.setItem("token", token);
          navigate("/admin/home");
          dispatch(
            adminSignIn({
              email,
            })
          );
        } else if (res.data.status === "Error") {
          alert(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <nav>
        <div class="nav-wrapper blue accent-3">
          <a href="#!" class="brand-logo center  ">
            Bus Ticket App
          </a>
        </div>
      </nav>
      <div class="row container">
        <br></br>
        <h1
          class="center blue-text text-accent-3"
          style={{
            fontWeight: "bold",
          }}
        >
          Admin SignIn Page
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <form
          class="col s12"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div class="row">
            <div class="input-field col s12">
              <input
                id="email"
                type="email"
                class="validate"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label for="email">Email</label>
            </div>
          </div>
          <br></br>
          <br></br>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="password"
                type="password"
                class="validate"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <label for="password">Password</label>
            </div>
          </div>
          <br></br>
          <br></br>
          <div
            className="col s12"
            style={{ paddingLeft: "11.250px" }}
            class="center"
          >
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Sign In
            </button>
          </div>
          <br></br>
          <div class="center ">
            <a href="/admin/signup" style={{ fontSize: "20px" }}>
              Don't have an account?
            </a>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSignIn;
