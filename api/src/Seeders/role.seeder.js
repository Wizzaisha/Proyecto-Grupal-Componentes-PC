const {Role} =  require ("../db")
const ROLES = require('./roles')

async function seederRole() {

  const response = await Role.findAll();

  if (response.length > 0) {
    console.log("Roles ya creados");
  } else {
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


  }
  
  module.exports = {
    seederRole,
  };
  