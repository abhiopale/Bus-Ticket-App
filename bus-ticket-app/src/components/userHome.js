import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";

import Navbar from "./userNav";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

const UserHome = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.headers.post["authorization"] = localStorage.token;
    axios
      .post("http://localhost:5000/user/bus/search", {
        from,
        to,
        date,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          setBuses(Object.values(res.data.result));
        } else {
          alert("No buses Availble");
        }
      })
      .catch((err) => alert(err.response.data.result));
  };

  return (
    <div>
      <Navbar />
      <Grid>
        <Grid align="center">
          <Paper
            elevation={20}
            sx={{
              padding: "30px 20px",
              width: "120vh",
              margin: "100px auto",
            }}
          >
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <h1>Bus Search</h1>

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
                sx={{ paddingTop: "30px" }}
                fullWidth
                id="fro,"
                type="text"
                onChange={(e) => setFrom(e.target.value)}
                label="From"
                variant="standard"
              ></TextField>
              <TextField
                sx={{ paddingTop: "30px" }}
                fullWidth
                id="to"
                type="text"
                onChange={(e) => setTo(e.target.value)}
                label="To"
                variant="standard"
              ></TextField>
              <TextField
                sx={{ paddingTop: "30px" }}
                fullWidth
                id="date"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                label="Date"
                variant="standard"
              ></TextField>
              <Grid sx={{ paddingTop: "50px" }}>
                <Button
                  sx={{ width: "500px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <div>
        {buses.map((bus) => {
          return (
            <Grid sx={{ paddingTop: "20px" }}>
              <Paper elevation={10}>
                <div
                  style={{
                    paddingLeft: "10vh",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      color: "#2196f3",
                      fontWeight: 4000,
                      fontSize: "2.4rem",
                    }}
                  >
                    {bus.name}
                  </h2>
                </div>
                <div style={{ marginLeft: "20vh" }}>
                  <h3>ID : </h3>
                  {bus._id}
                  <h3>Bus Number : </h3>
                  {bus.busNumber}
                  <h3>From : </h3>
                  {bus.arrival}
                  <h3>To : </h3>
                  {bus.destination}
                  <h3>Timing : </h3>
                  {bus.time}

                  <div style={{ paddingBottom: "2vh" }}>
                    <Link to={`/user/bus/${bus._id}`}>
                      <Button
                        sx={{
                          width: "20vh",
                          marginLeft: "150vh",
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Book Ticket
                      </Button>
                    </Link>
                  </div>
                </div>
              </Paper>
            </Grid>
          );
        })}
      </div>
    </div>
  );
};

export default UserHome;
