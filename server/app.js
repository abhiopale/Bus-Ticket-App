const express = require('express');

const app = express();

const dotenv = require("dotenv");

dotenv.config({path:'../config.env'})

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const router = new express.Router();

const connection = require('./db/conn');

const { json } = require('body-parser');

const userController = require('../server/routes/user');

const adminController = require('../server/routes/admin');

const path = require('path');


// Middleware

app.use(adminController);
app.use(userController);

app.use(express.json());

app.listen(process.env.PORT,() => {
    // eslint-disable-next-line no-console
    console.log('Server is running'+ process.env.PORT);
  });