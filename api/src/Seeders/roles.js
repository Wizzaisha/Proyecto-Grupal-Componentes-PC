const {user2, admin, superAdmin} = require('../Auth/authConfig')
 
const ROLES = {
    superAdmin: superAdmin,
    Admin: admin,
    User_role: user2,
  };
  // console.log(ROLES.superAdmin)
  module.exports = ROLES;