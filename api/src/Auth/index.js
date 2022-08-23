const authJwt = require("./authJwt");
const {veryfySignUp} = require("./verifySignUp");
const controller = require("./auth.controller");

module.exports = {
  authJwt,
  veryfySignUp,
  controller
};