import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Button, TextField, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
const axios = require("axios").default;

const TicketBooking = () => {
  const { busid } = useParams();
  const [tickets, settickets] = useState([]);
  const [seatNo, setSeatNo] = useState([]);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [passengerName, setPassengerName] = useState([]);

  const seatSelected = (seatNo) => {
    let array = [];
    array.push(seatNo);
    setSeatNo(array);
  };
  const getTickets = (busid) => {
    axios.defaults.headers.post["header1"] = localStorage.token;
    axios
      .post("http://localhost:5000/user/bus/details", {
        busid,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          let t = Object.values(res.data.result);
          settickets(t);
        }
      })
      .catch((err) => alert(err.response.data.result));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(seatNo, passengerName);
    axios.defaults.headers.post["header1"] = localStorage.token;
    axios
      .post("http://localhost:5000/user/bus/booktickets", {
        id: busid,
        seatNo,
        modeOfPayment,
        passengerName,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          alert(res.data.result);
        }
      })
      .catch((err) => alert(err.response.data.result));
  };
  useEffect(() => {
    getTickets(busid);
  }, []);

  return (
    <div>
      <Paper
        elevation={20}
        sx={{
          padding: "30px 20px",
          width: "120vh",
          margin: "100px auto",
          justifyContent: "space-around",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "5vh" }}>
          Choose The seat Number
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
              <div>
                {ticket.isBooked ? (
                  <Grid>
                    <Button
                      sx={{
                        width: "100px",
                        marginLeft: "12vh",
                        marginBottom: "2vh",
                      }}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => alert("seat is alredy booked")}
                    >
                      {ticket.seatNo}
                    </Button>
                  </Grid>
                ) : (
                  <Grid>
                    <Button
                      sx={{
                        width: "100px",
                        marginLeft: "12vh",
                        marginBottom: "2vh",
                      }}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => seatSelected(ticket.seatNo)}
                    >
                      {ticket.seatNo}
                    </Button>
                  </Grid>
                )}
              </div>
            );
          })}
        </Grid>
      </Paper>

      <Paper
        elevation={20}
        sx={{
          padding: "30px 20px",
          width: "120vh",
          margin: "100px auto",
          justifyContent: "space-around",
        }}
      >
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
            id="Passenger Name"
            type="text"
            onChange={(e) => {
              let array = [];
              array.push(e.target.value);
              setPassengerName(array);
            }}
            label="Passenger Name"
            variant="standard"
          ></TextField>
          <TextField
            sx={{ paddingTop: "30px" }}
            fullWidth
            id="Mode Of Payment"
            type="text"
            onChange={(e) => setModeOfPayment(e.target.value)}
            label="Mode Of Payment"
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
    </div>
  );
};
export default TicketBooking;
