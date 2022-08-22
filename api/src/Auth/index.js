const authJwt = require("./authJwt");
const {checkDuplicateUsernameOrEmail, checkRolesExisted} = require("./verifySignUp");
const controller = require("./auth.controller");

module.exports = {
  authJwt,
  checkDuplicateUsernameOrEmail, checkRolesExisted,
  controller
};