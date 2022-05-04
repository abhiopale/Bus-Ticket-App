import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import Footer from "./footer";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import AdminNav from "./adminNav";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@mui/material";

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
        }
      })
      .catch((err) => {
        alert("Incorrect info please add the correct info");
        console.log(err);
      });
  };

  return (
    <div>
      <Grid>
        <Grid align="center">
          <Paper
            elevation={20}
            sx={{ padding: "30px 20px", width: "700px", margin: "100px auto" }}
          >
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <h1>BUS TICKET APP</h1>
            <h2>Admin Sign Up</h2>

            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              style={{
                paddingRight: "50px",
                paddingLeft: "50px",
                paddingBottom: "30px",
              }}
            >
              <TextField
                fullWidth
                sx={{ paddingTop: "30px" }}
                variant="standard"
                id="name"
                type="text"
                label="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                sx={{ paddingTop: "30px" }}
                fullWidth
                id="companyName"
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                label="Company Name"
                variant="standard"
              ></TextField>
              <TextField
                sx={{ paddingTop: "30px" }}
                fullWidth
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="standard"
              ></TextField>
              <TextField
                sx={{ paddingTop: "30px" }}
                fullWidth
                id="phoneNumber "
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                label="Phone Number"
                variant="standard"
              ></TextField>
              <TextField
                sx={{ paddingTop: "30px" }}
                fullWidth
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="standard"
              ></TextField>
              <Grid sx={{ paddingTop: "50px" }}>
                <Button
                  sx={{ width: "500px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </Grid>
            </form>
            <a href="/user/signin">Already have an account?</a>
          </Paper>
        </Grid>
      </Grid>
    </div>
    // <div>
    //   <nav>
    //     <div class="nav-wrapper blue accent-3">
    //       <a href="#!" class="brand-logo center  ">
    //         Bus Ticket App
    //       </a>
    //     </div>
    //   </nav>
    //   <div class="row container">
    //     <br></br>
    //     <h1
    //       class="center blue-text text-accent-3"
    //       style={{
    //         fontWeight: "bold",
    //       }}
    //     >
    //       Admin SignUp Page
    //     </h1>

    //     <div class="row">
    //       <form
    //         class="col s12"
    //         onSubmit={(e) => {
    //           handleSubmit(e);
    //         }}
    //       >
    //         <div class="row">
    //           <div class="input-field col s6">
    //             <input
    //               id="Name"
    //               type="text"
    //               class="validate"
    //               onChange={(e) => setName(e.target.value)}
    //             ></input>
    //             <label for="Name"> Name</label>
    //           </div>
    //           <div class="input-field col s6">
    //             <input
    //               id="companyName"
    //               type="text"
    //               class="validate"
    //               onChange={(e) => setCompanyName(e.target.value)}
    //             ></input>
    //             <label for="companyName">Company Name</label>
    //           </div>
    //         </div>
    //         <div class="row">
    //           <div class="input-field col s12">
    //             <input
    //               id="email"
    //               type="email"
    //               class="validate"
    //               onChange={(e) => setEmail(e.target.value)}
    //             ></input>
    //             <label for="email">Email</label>
    //           </div>
    //         </div>
    //         <div class="row">
    //           <div class="input-field col s12">
    //             <input
    //               id="phoneNumber"
    //               type="text"
    //               class="validate"
    //               onChange={(e) => setPhoneNumber(e.target.value)}
    //             ></input>
    //             <label for="phoneNumber">Phone Number</label>
    //           </div>
    //         </div>
    //         <div class="row">
    //           <div class="input-field col s12">
    //             <input
    //               id="password"
    //               type="password"
    //               class="validate"
    //               onChange={(e) => setPassword(e.target.value)}
    //             ></input>
    //             <label for="password">Password</label>
    //           </div>
    //         </div>
    //         <div
    //           className="col s12"
    //           style={{ paddingLeft: "11.250px" }}
    //           class="center"
    //         >
    //           <button
    //             style={{
    //               width: "350px",
    //               borderRadius: "3px",
    //               letterSpacing: "1.5px",
    //               marginTop: "1rem",
    //             }}
    //             type="submit"
    //             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
    //           >
    //             Sign Up
    //           </button>
    //         </div>
    //         <br></br>
    //       </form>
    //       <div class="center ">
    //         <a href="/admin/signin" style={{ fontSize: "20px" }}>
    //           Already have an account?
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>
  );
};

export default AdminSignUp;
