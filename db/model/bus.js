const date = require("@hapi/joi/lib/types/date");
const express = require("express");
const { number, string, boolean, object } = require("joi");

const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    trim: true,
    required: true,
  },
  busNumber: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
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
  seats: {
    type: Object,
    required: true,
  },
  arrival: {
    type: String,
    lowercase: true,
  },
  destination: {
    type: String,
    lowercase: true,
  },
});

const bus = new mongoose.model("bus", busSchema);
module.exports = bus;
