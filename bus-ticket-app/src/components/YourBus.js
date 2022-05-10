import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";

import Nav from "./AdminNav";

const axios = require("axios").default;

const YourBus = () => {
  const [Buses, setBuses] = useState([]);

  const getBus = () => {
    axios.defaults.headers.get["authorization"] = localStorage.adminToken;
    axios
      .get("http://localhost:5000/admin/yourbus")
      .then((res) => {
        if (res.data.status === "Success") {
          setBuses(res.data.result);
          console.log(Buses);
        } else {
          alert("No buses Availble");
        }
      })
      .catch((err) => alert(err.response.data.result));
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <div>
      <Nav />
      <h1 style={{ paddingTop: "5%", textAlign: "center" }}>Here's Your Bus</h1>
      {Buses.map((bus) => {
        return (
          <Card
            elevation={10}
            sx={{
              minWidth: 275,
              margin: "5%",
            }}
          >
            <CardContent style={{ marginLeft: "10%" }}>
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
                  Bus Number :
                </span>{" "}
                <span color="text.secondary"> {bus.busNumber}</span>
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
                <Link to={`/admin/bus/${bus._id}`}>
                  <Button
                    sx={{
                      width: "20vh",
                      marginLeft: "150vh",
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Check sales
                  </Button>
                </Link>
              </div>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default YourBus;
