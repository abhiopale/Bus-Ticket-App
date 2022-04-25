import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { userSignUp } from "../redux/slices/userSignUpSlice";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      userSignUp({
        firstName: firstName,
        email: email,
        lastName: lastName,
        phoneNumber: phoneNumber,
        password: password,
      })
    );
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default UserSignUp;
