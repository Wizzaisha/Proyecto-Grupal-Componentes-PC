const {Role} =  require ("../db")
const ROLES = require('./roles')

function seederRole() {
    Role.create({
      id: 1,
      name: ROLES.User_role,
    });
  
    Role.create({
      id: 2,
      name: ROLES.Admin,
    });

    Role.create({
        id: 3,
        name: ROLES.SuperAdmin,
      });
      console.log("SeederRole")
  }
  
  module.exports = {
    seederRole,
  };
  