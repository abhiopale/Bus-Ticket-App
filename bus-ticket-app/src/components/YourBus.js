import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Paper,
  Grid,
} from "@mui/material";

import Modal from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/Close";

import { useSnackbar } from "notistack";

import Nav from "./AdminNav";

const axios = require("axios").default;

const YourBus = () => {
  const [Buses, setBuses] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const [busId, setBusId] = useState("");
  const [tickets, settickets] = useState([]);
  const [Sales, setSales] = useState(null);
  const [ticketData, setTicketData] = useState();
  const [selectedSeat, setselectedSeat] = useState([]);
  const [ticketWindow, setTicketWindow] = useState(true);

  useEffect(() => {
    ticketDetails(selectedSeat, busId);
  }, [selectedSeat]);

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
      });
    // .catch((err) => enqueueSnackbar(err.response.data.result.toString()));
  };

  const ticketDetails = async (seatNo, busId) => {
    axios.defaults.headers.post["authorization"] = localStorage.adminToken;
    axios
      .post("http://localhost:5000/admin/ticketdetails", {
        busId,
        seatNo,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          setTicketData(res.data.result);
          console.log(ticketData);
        }
      })
      .catch((err) => enqueueSnackbar(err.response.data.result.toString()));
  };

  const getSales = (busid) => {
    axios.defaults.headers.post["authorization"] = localStorage.adminToken;
    axios
      .post("http://localhost:5000/admin/bus/sales", {
        busid,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          setSales(res.data.result);
        }
      });
    // .catch((err) => enqueueSnackbar(err.response.data.result.toString()));
  };

  useEffect(() => {
    getTickets(busId);
    getSales(busId);
  }, [busId]);

  // useEffect(() => {
  //   ticketDetails(selectedSeat, busId);
  // }, [selectedSeat]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChildOpen = () => setChildOpen(true);
  const handleChildClose = () => setChildOpen(false);

  const getBus = () => {
    axios.defaults.headers.get["authorization"] = localStorage.adminToken;
    axios
      .get("http://localhost:5000/admin/yourbus")
      .then((res) => {
        if (res.data.status === "Success") {
          setBuses(res.data.result);
        } else {
          enqueueSnackbar("No buses Availble");
        }
      })
      .catch((err) => enqueueSnackbar(err.response.data.result.toString()));
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <div>
      <Nav />
      <h1
        style={{
          paddingTop: "10%",
          textAlign: "center",
          fontSize: "400%",
          color: "crimson",
        }}
      >
        Here's Your Bus
      </h1>
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
                  color: "crimson",
                }}
              >
                {bus.name.toUpperCase()}
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
                <span color="text.secondary"> {bus.arrival.toUpperCase()}</span>
              </Typography>{" "}
              <Typography
                sx={{ fontSize: "1.3rem", fontWeight: 500, marginTop: "1%" }}
              >
                <span style={{ fontWeight: 1000 }}>To: </span>{" "}
                <span color="text.secondary">
                  {" "}
                  {bus.destination.toUpperCase()}
                </span>
              </Typography>
            </CardContent>
            <CardActions>
              <div style={{ paddingBottom: "2vh" }}>
                <Button
                  sx={{
                    width: "20vh",
                    marginLeft: "150vh",
                    backgroundColor: "crimson",
                  }}
                  onClick={() => {
                    handleOpen();
                    setBusId(bus._id);
                  }}
                  type="submit"
                  variant="contained"
                >
                  Check sales
                </Button>
              </div>
            </CardActions>
          </Card>
        );
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {ticketWindow ? (
          <Paper
            elevation={20}
            sx={{
              padding: "30px 20px",
              width: "120vh",
              margin: "100px auto",
              justifyContent: "space-around",
            }}
          >
            <span style={{ marginLeft: "95%" }}>
              <CloseIcon sx={{ fontSize: "2rem" }} onClick={handleClose} />
            </span>
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
                        backgroundColor: ticket.isBooked ? "gray" : "crimson",
                      }}
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        console.log(ticket.seatNo);
                        ticketDetails(ticket.seatNo, busId);

                        setTicketWindow(false);
                      }}
                    >
                      {ticket.seatNo}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        ) : (
          <div>
            {ticketData.map((ticket) => {
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
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h5"
                        component="div"
                        style={{
                          fontWeight: 1000,
                          fontSize: "3rem",
                          color: "crimson",
                        }}
                      >
                        {ticket.bus.toUpperCase()}
                      </Typography>
                      <Typography variant="body2">
                        <span
                          style={{
                            fontWeight: 1000,
                            fontSize: "1.3rem",
                            fontSize: "2.5rem",
                            color: "crimson",
                          }}
                        >
                          {" "}
                          Rs. {ticket.rate}
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
                        Mode Of Payment :
                      </span>
                      <span
                        color="text.secondary"
                        style={{ fontSize: "1.3rem" }}
                      >
                        {" "}
                        {ticket.modeOfPayment}
                      </span>
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
                        Seat No :
                      </span>
                      <span
                        color="text.secondary"
                        style={{ fontSize: "1.3rem" }}
                      >
                        {" "}
                        {ticket.seatNo}
                      </span>
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
                      <span
                        color="text.secondary"
                        style={{ fontSize: "1.3rem" }}
                      >
                        {" "}
                        {ticket.date}
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
                        Passenger:{" "}
                      </span>{" "}
                      <span color="text.secondary">
                        {" "}
                        {ticket.customerName.toUpperCase()}
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 500,
                        marginTop: "1%",
                      }}
                    >
                      <span style={{ fontWeight: 1000 }}>From: </span>{" "}
                      <span color="text.secondary">
                        {" "}
                        {ticket.arrival.toUpperCase()}
                      </span>
                    </Typography>{" "}
                    <Typography
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 500,
                        marginTop: "1%",
                      }}
                    >
                      <span style={{ fontWeight: 1000 }}>To: </span>{" "}
                      <span color="text.secondary">
                        {" "}
                        {ticket.destiny.toUpperCase()}
                      </span>
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default YourBus;
