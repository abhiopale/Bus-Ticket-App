import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import Footer from "./footer";

const axios = require("axios").default;

const AdminSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/admin/signup", {
        name,
        companyName,
        email,
        phoneNumber,
        password,
      })
      .then((res) => {
        if (res.data.status == "Success") {
          navigate("/admin/signin");
          console.log("Posting Data", res);
        } else {
          alert(res.data.result);
        }
      })
      .catch((err) => {
        alert("Incorrect info please add the correct info");
        console.log(err);
      });
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
          Admin SignUp Page
        </h1>

        <div class="row">
          <form
            class="col s12"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div class="row">
              <div class="input-field col s6">
                <input
                  id="Name"
                  type="text"
                  class="validate"
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <label for="Name"> Name</label>
              </div>
              <div class="input-field col s6">
                <input
                  id="companyName"
                  type="text"
                  class="validate"
                  onChange={(e) => setCompanyName(e.target.value)}
                ></input>
                <label for="companyName">Company Name</label>
              </div>
            </div>
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
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="phoneNumber"
                  type="text"
                  class="validate"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
                <label for="phoneNumber">Phone Number</label>
              </div>
            </div>
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
          </form>
          <div class="center ">
            <a href="/admin/signin" style={{ fontSize: "20px" }}>
              Already have an account?
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSignUp;
