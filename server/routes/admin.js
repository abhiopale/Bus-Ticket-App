const express = require("express");

const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

const router = new express.Router();

const bcrypt = require("bcrypt");

const Admin = require("../db/model/admin");

const Bus = require("../db/model/bus");

const Ticket = require("../db/model/ticket");

const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

var cookie = require("cookie");

const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

function adminAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null)
    return res.status(500).json({
      status: "Error",
      result: "Access Denied",
    });

  jwt.verify(token, process.env.ADMIN_KEY, (err, email) => {
    if (err)
      return res.status(500).json({
        status: "Error",
        result: "Access Denied",
      });
    req.email = email;
  });
  next();
}

router.post("/admin/login", jsonParser, async (req, res) => {
  try {
    let Email = req.body.email;
    let adminDetails = await Admin.findOne({ email: Email });
    if (adminDetails) {
      const passCheck = await bcrypt.compare(
        req.body.password,
        adminDetails.password
      );

      if (passCheck == true) {
        let token = jwt.sign(Email, process.env.ADMIN_KEY);
        // res.cookie("token", token);
        // window.localStorage.setItem("token", token);
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

router.post("/admin/signup", jsonParser, async (req, res) => {
  let { name, companyName, phoneNumber, email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        status: "Error",
        result: "Email already exists",
      });
    }
    const existingNumber = await Admin.findOne({ phoneNumber });
    if (existingNumber) {
      return res.status(500).json({
        status: "Error",
        result: "Number already exists",
      });
    }

    // this will be implemented if the email in not register with the data base
    else {
      password = await bcrypt.hash(password, 12);
      let admin = new Admin({
        name,
        companyName,
        phoneNumber,
        email,
        isAdmin: true,
        password,
        yourBus: [],
      });
      admin.save();
      res.status(200).json({
        status: "Success",
        result: "Successfully signed up In",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      result: "Please add the correct info",
    });
  }
});

router.post(
  "/admin/bus/uploaddetails",
  adminAuth,
  jsonParser,
  async (req, res) => {
    let email = req.email;
    const clientDetails = await Admin.findOne({ email });
    if (!clientDetails) {
      res.status(500).json({
        status: "error",
        result: "email doesn't exist",
      });
    } else {
      let {
        busNumber,
        rate,
        date,
        time,
        seatCount,
        arrival,
        destination,
      } = req.body;
      try {
        const existingBus = await Bus.findOne({ busNumber, date });
        if (existingBus) {
          res.status(500).json({
            status: "error",
            result: "Trip for the same bus on the given date already exists",
          });
        } else {
          let seats = {};
          for (i = 1; i <= seatCount; i++) {
            seats[i] = {
              isBooked: false,
              ticket: null,
            };
          }
          const bus = new Bus({
            name: clientDetails.companyName,
            busNumber,
            rate,
            date,
            time,
            seats,
            arrival,
            destination,
          });

          let busOwner = await Admin.findOneAndUpdate(
            { email },
            { $push: { yourBus: bus } }
          );
          bus.save();
          res.json({
            status: "Success",
            result: "Bus and tickets both are created",
          });
        }
      } catch (error) {
        res.status(500).json({
          status: "error",
          result: "Please fill in the appropriate details.",
        });
      }
    }
  }
);

router.post("/admin/bus/sales", adminAuth, jsonParser, async (req, res) => {
  let email = req.email;
  let _id = req.body._id;
  try {
    let adminInfo = await Admin.findOne({ email });
    let busInfo = await Bus.findOne({ _id });
    if (adminInfo.companyName === busInfo.name) {
      let soldTickets = await Ticket.find({
        isBooked: true,
        busNumber: busInfo.busNumber,
      });
      console.log(soldTickets);
      let sales = 0;
      for (i = 0; i < soldTickets.length; i++) {
        sales += soldTickets[i].rate;
      }
      res.json({
        status: "Success",
        result: "Sales of bus Number " + busInfo.busNumber + " is " + sales,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      result: "Please fill in the appropriate details.",
    });
  }
});

module.exports = router;
