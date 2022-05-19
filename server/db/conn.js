/* eslint-disable no-console */
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://abhi:abhiopale@cluster0.fx7lc.mongodb.net/Bus-Ticket-App?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });
