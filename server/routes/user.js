const express = require("express");

const app = express();

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config({ path: "./env" });

app.use(express.json());

const validate = require("validator");

const mongoose = require("mongoose");

const router = new express.Router();

const Joi = require("@hapi/joi");

const bcrypt = require("bcrypt");

const User = require("../db/model/user");

const Admin = require("../db/model/admin");

const Bus = require("../db/model/bus");

const Ticket = require("../db/model/ticket");

const bodyParser = require("body-parser");
const bus = require("../db/model/bus");
const values = require("@hapi/joi/lib/values");

const jsonParser = bodyParser.json();

function userAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null)
    return res.status(500).json({
      status: "Error",
      result: "Access Denied",
    });

  jwt.verify(token, process.env.USER_KEY, (err, email) => {
    if (err)
      return res.status(500).json({
        status: "Error",
        result: "Access Denied",
      });
    req.email = email;
  });
  next();
}

router.post("/user/login", jsonParser, async (req, res) => {
  try {
    let Email = req.body.email;
    let userDetails = await User.findOne({ email: Email });
    if (userDetails) {
      const passCheck = await bcrypt.compare(
        req.body.password,
        userDetails.password
      );

      if (passCheck == true) {
        const token = jwt.sign(Email, process.env.USER_KEY);
        res.json({
          status: "Success",
          result: {
            token: token,
          },
        });
      } else {
        res.status(500).json({
          status: "Error",
          result: "Incorrect Login Details",
        });
      }
    } else {
      res.status(500).json({
        status: "Error",
        result: "Incorrect Login Details",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Error",
      result: {
        error: e,
      },
    });
  }
});

router.post("/user/signup", jsonParser, async (req, res) => {
  let { firstName, lastName, phoneNumber, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    const existingNumber = await User.findOne({ phoneNumber });
    if (existingUser) {
      res.status(500).json({
        status: "Error",
        result: "Email already exists",
      });
    } else if (existingNumber) {
      res.status(500).json({
        status: "Error",
        result: "Number already exists",
      });
    }

    // this will be implemented if the email in not register with the data base
    else {
      password = await bcrypt.hash(password, 12);
      let user = new User({
        firstName,
        lastName,
        phoneNumber,
        email,
        isAdmin: false,
        password,
      });
      user.save();
      res.status(200).json({
        status: "Success",
        result: "Successfully logged In",
      });
    }
  } catch (e) {
    res.json({
      status: "error",
      result: "Please add the correct info",
    });
  }
});

router.post("/user/bus/search", userAuth, jsonParser, async (req, res) => {
  let { from, to, date } = req.body;
  try {
    const busList = await Bus.find({ arrival: from, destiny: to, date });
    if (busList.length == 0) {
      res.status(500).json({
        status: "error",
        result: "Sorry no Buses available",
      });
    } else {
      res.json({
        status: "Success",
        result: busList,
      });
    }
  } catch (error) {
    {
      res.status(500).json({
        status: "error",
        result: "Please fill in the appropriate details.",
      });
    }
  }
});

router.post("/user/bus/booktickets", userAuth, jsonParser, async (req, res) => {
  let email = req.email;
  const { id, seatNo, modeOfPayment, passengerName } = req.body;
  try {
    let ticketList = [];
    let busExist = await Bus.findOne({ _id: id });
    if (!busExist) {
      res.status(500).json({
        status: "Error",
        result: "sorry no bus available on the given date",
      });
    } else if (seatNo.length != passengerName.length) {
      res.status(500).json({
        status: "Error",
        result: "Please add the passenger Details",
      });
    } else {
      let count = 0;
      bookedSeats = [];
      seatNo.forEach((seat) => {
        seat = seat.toString();
        let actaulSeat = busExist.seats[seat];
        if (actaulSeat.isBooked == true) {
          bookedSeats.push(seat);
        } else {
          count += 1;
        }
      });
      if (count == seatNo.length) {
        let newSeatCollection = {};
        ticketList = [];
        for (i = 0; i < seatNo.length; i++) {
          let ticket = new Ticket({
            seatNo: seatNo[i],
            customerName: passengerName[i],
            customerEmail: email,
            isBooked: true,
            busNumber: busExist.busNumber,
            rate: busExist.rate,
            date: busExist.date,
            time: busExist.time,
            arrival: busExist.arrival,
            destiny: busExist.destination,
            modeOfPayment,
          });
          newSeatCollection[seatNo[i]] = {
            isBooked: true,
            ticket: ticket._id,
          };
          ticket.save();
          ticketList.push(ticket);
        }
        let keys = Object.keys(newSeatCollection);
        keys.map((x) => {
          busExist.seats[x] = newSeatCollection[x];
        });
        let newSeats = busExist.seats;
        await Bus.findOneAndUpdate({ _id: id }, { $set: { seats: newSeats } });
        res.json({
          status: "Success",
          result: "Tickets are booked",
          ticketList: ticketList,
        });
      } else {
        res.json({
          status: "Error",
          result: "seat numbers are already booked are booked",
          bookedSeats: bookedSeats,
        });
      }
    }
  } catch (error) {
    {
      res.status(500).json({
        status: "Error",
        result: "Please fill in the appropriate details.",
      });
    }
  }
});

router.post("/user/bus/details", userAuth, jsonParser, async (req, res) => {
  let { _id } = req.body;
  try {
    let busDetails = await Bus.findOne({ _id });
    if (busDetails) {
      res.json({
        status: "Success",
        result: busDetails,
      });
    } else {
      res.status(500).json({
        status: "Error",
        result: "Please fill in the appropriate details.",
      });
    }
  } catch (error) {
    {
      res.status(500).json({
        status: "Error",
        result: "Please fill in the appropriate details.",
      });
    }
  }
});

router.get("/user/ticket", userAuth, jsonParser, async (req, res) => {
  let email = req.email;
  try {
    const tickets = await Ticket.find({ customerEmail: email });
    res.json({
      status: "Success",
      result: tickets,
    });
  } catch (error) {
    {
      res.status(500).json({
        status: "Error",
        result: "Please fill in the appropriate details.",
      });
    }
  }
});

module.exports = router;
