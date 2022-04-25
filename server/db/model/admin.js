const express = require("express");

const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const { array, string, required } = require("joi");
const { result } = require("@hapi/joi/lib/base");

const router = new express.Router();

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    lowercase: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    minlength: 3,
    lowercase: true,
    trim: true,
    unique: "company already exists",
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12,
    unique: "number already exists",
  },
  email: {
    type: String,
    required: true,
    unique: "email already exists",
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  yourBus: {
    type: Array,
  },
});

const admin = new mongoose.model("admin", adminSchema);
module.exports = admin;
