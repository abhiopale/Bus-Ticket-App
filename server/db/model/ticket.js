const date = require("@hapi/joi/lib/types/date");
const express = require("express");
const { number, string, boolean } = require("joi");

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  seatNo: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
  },
  customerEmail: {
    type: String,
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
  bus: {
    type: String,
    required: true,
  },
  busNumber: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  busId: {
    type: String,
  },
  rate: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  arrival: {
    type: String,
  },
  destiny: {
    type: String,
  },
  modeOfPayment: {
    type: String,
  },
});

const ticket = new mongoose.model("ticket", ticketSchema);
module.exports = ticket;
