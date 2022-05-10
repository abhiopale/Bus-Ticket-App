import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Grid,
  Paper,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
} from "@mui/material";

import Nav from "./Nav";

import { Link } from "react-router-dom";

const axios = require("axios").default;

const UserHome = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.headers.post["authorization"] = localStorage.userToken;
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
      <Nav />
      <Grid>
        <Grid align="center">
          <Paper
            elevation={20}
            sx={{
              padding: "30px 20px",
              width: "80%",
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
            <Card
              elevation={10}
              sx={{
                minWidth: 275,
                margin: "5%",
              }}
            >
              <CardContent style={{ marginLeft: "10%" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {" "}
                  <Typography
                    variant="h5"
                    component="div"
                    style={{
                      fontWeight: 1000,
                      fontSize: "3rem",
                    }}
                  >
                    {bus.name}
                  </Typography>
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: 1000,
                        fontSize: "2.5rem",
                      }}
                    >
                      Rate:
                    </span>
                    <span
                      style={{
                        fontWeight: 1000,
                        fontSize: "1.3rem",
                        fontSize: "2.5rem",
                      }}
                    >
                      {" "}
                      {bus.rate}
                    </span>
                    <br />
                  </Typography>
                </div>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontSize: "1.3rem",
                    marginTop: "1%",
                  }}
                  gutterBottom
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      fontSize: "1.3rem",
                    }}
                  >
                    {" "}
                    Date:
                  </span>
                  <span color="text.secondary" style={{ fontSize: "1.3rem" }}>
                    {" "}
                    {bus.date}
                  </span>
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontSize: "1.3rem",
                    marginTop: "1%",
                  }}
                >
                  <span style={{ fontWeight: 1000, fontSize: "1.3rem" }}>
                    Timings:{" "}
                  </span>{" "}
                  <span color="text.secondary"> {bus.time}</span>
                </Typography>
                <Typography
                  sx={{ fontSize: "1.3rem", fontWeight: 500, marginTop: "1%" }}
                >
                  <span style={{ fontWeight: 1000 }}>From: </span>{" "}
                  <span color="text.secondary"> {bus.arrival}</span>
                </Typography>{" "}
                <Typography
                  sx={{ fontSize: "1.3rem", fontWeight: 500, marginTop: "1%" }}
                >
                  <span style={{ fontWeight: 1000 }}>To: </span>{" "}
                  <span color="text.secondary"> {bus.destination}</span>
                </Typography>
              </CardContent>
              <CardActions>
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
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserHome;
