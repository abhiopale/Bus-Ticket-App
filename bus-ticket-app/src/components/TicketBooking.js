import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Paper } from "@mui/material";
const axios = require("axios").default;

const TicketBooking = () => {
  const { busid } = useParams();
  const [tickets, settickets] = useState([]);
  const [seatNo, setSeatNo] = useState([]);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [hideForm, setHideForm] = useState(true);
  const [passengerName, setPassengerName] = useState([]);

  const seatSelected = (seat) => {
    setSeatNo([...seatNo, seat]);
  };

  const nameInput = (value) => {
    setPassengerName([...passengerName, value]);
  };

  const getTickets = (busid) => {
    axios.defaults.headers.post["authorization"] = localStorage.token;
    axios
      .post("http://localhost:5000/user/bus/details", {
        busid,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          settickets(Object.values(res.data.result));
        }
      })
      .catch((err) => alert(err.response.data.result));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.defaults.headers.post["authorization"] = localStorage.token;
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
  // callBack(busid, seatNo, modeOfPayment, passengerName);
  // console.log(seatNo, passengerName);

  // setSeatNo(seatArray, callBack(busid, seatNo, modeOfPayment, passengerName));

  useEffect(() => {
    getTickets(busid);
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      {hideForm ? (
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
                    onClick={() => {
                      seatSelected(ticket.seatNo);
                    }}
                  >
                    {ticket.seatNo}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Button
            onClick={() => {
              setHideForm(false);
            }}
            sx={{ width: "500px", marginLeft: "25%", marginTop: "5%" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </Paper>
      ) : (
        <Paper
          elevation={20}
          sx={{
            padding: "30px 20px",
            width: "120vh",
            margin: "100px auto",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={() => {
              setHideForm(true);
            }}
            sx={{ width: "200px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Go back to Seats
          </Button>
          <h1 style={{ textAlign: "center" }}>Book Ticket</h1>
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
            {seatNo.map((seat) => {
              return (
                <TextField
                  sx={{ paddingTop: "30px" }}
                  fullWidth
                  id="Passenger Name"
                  type="text"
                  onChange={(e) => {
                    nameInput(e.target.value);
                  }}
                  label="Passenger 1"
                  variant="standard"
                ></TextField>
              );
            })}
            <TextField
              sx={{ paddingTop: "30px" }}
              fullWidth
              required
              id="Mode Of Payment"
              type="text"
              onChange={(e) => setModeOfPayment(e.target.value)}
              label="Mode Of Payment"
              variant="standard"
            ></TextField>
            <Grid sx={{ paddingTop: "50px", paddingLeft: "20%" }}>
              <Button
                onClick={() => {}}
                sx={{ width: "500px" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Book
              </Button>
            </Grid>
          </form>
        </Paper>
      )}
    </div>
  );
};
export default TicketBooking;
