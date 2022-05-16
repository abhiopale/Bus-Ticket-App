import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import Nav from "./Nav";

const axios = require("axios").default;

const AdminSales = () => {
  const { busid } = useParams();
  const [tickets, settickets] = useState([]);
  const [Sales, setSales] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getTickets = (busid) => {
    axios.defaults.headers.post["authorization"] = localStorage.adminToken;
    axios
      .post("http://localhost:5000/admin/bus/details", {
        busid,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          settickets(Object.values(res.data.result));
        }
      })
      .catch((err) => enqueueSnackbar(err.response.data.result.toString()));
  };

  const getSales = (busid, date) => {
    axios.defaults.headers.post["authorization"] = localStorage.adminToken;
    axios
      .post("http://localhost:5000/admin/bus/sales", {
        busid,
        date,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          setSales(res.data.result);
        }
      })
      .catch((err) => enqueueSnackbar(err.response.data.result.toString()));
  };

  useEffect(() => {
    getTickets(busid);
    getSales(busid);
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <Nav />

      <Paper
        elevation={20}
        sx={{
          padding: "30px 20px",
          width: "120vh",
          margin: "100px auto",
          justifyContent: "space-around",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "5%" }}>
          Sales Of the Bus Trip is {Sales}
        </h1>
        <Grid
          container
          spacing={1}
          item
          lg={10}
          sx={{ justifyContent: "space-between" }}
        >
          {tickets.map((ticket) => {
            return (
              <Grid>
                <Button
                  sx={{
                    width: "100px",
                    marginLeft: "12vh",
                    marginBottom: "2vh",
                  }}
                  disabled={ticket.isBooked}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {ticket.seatNo}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
};

export default AdminSales;
