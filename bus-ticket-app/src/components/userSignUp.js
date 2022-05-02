import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import Footer from "./footer";

const axios = require("axios").default;

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/user/signup", {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      })
      .then((res) => {
        if (res.data.status == "Success") {
          navigate("/user/signin");
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
        <h1
          class="center blue-text text-accent-3"
          style={{
            fontWeight: "bold",
          }}
        >
          User SignUp Page
        </h1>
        <a href="/admin/signup">
          <div
            className="col s12"
            style={{ paddingLeft: "11.250px" }}
            class="center"
          >
            <button
              style={{
                width: "350px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Admin Sign Up{" "}
            </button>
          </div>
        </a>

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
                  id="firstName"
                  type="text"
                  class="validate"
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                <label for="firstName">First Name</label>
              </div>
              <div class="input-field col s6">
                <input
                  id="lastName"
                  type="text"
                  class="validate"
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                <label for="lastName">Last Name</label>
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
            <a href="/user/signin" style={{ fontSize: "20px" }}>
              Already have an account?
            </a>
          </div>
        </div>
        <br></br>
      </div>
      <Footer />
    </div>
  );
};

{
  /* <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <h1>Bus Ticket App</h1>
          <h2>User SignUp form</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="input-field col s12">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                type="text"
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setlastName(e.target.value)}
                id="lastName"
                type="text"
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setphoneNumber(e.target.value)}
                id="phoneNumber"
                type="text"
              />
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> */
}

export default UserSignUp;
