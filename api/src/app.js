const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// Import routes
const home = require("./routes/home.route.js");

require('./db.js');

const server = express();

server.name = 'API';

server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));

// Routes
server.use("/", home);


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;