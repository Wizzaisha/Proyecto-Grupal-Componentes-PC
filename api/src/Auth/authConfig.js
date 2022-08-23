 
const dotenv = require("dotenv");
const {USER , ADMIN, SUPERADMIN,USERSA,EMAILSA,PASSWORDSA} =  process.env;
module.exports = {
    secret: "Lomocompleto1-secret-key",
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours
    superAdmin: SUPERADMIN,
    admin: ADMIN,
    user2: USER,
    userSA: USERSA,
    emailSA:EMAILSA,
    passwordSA: PASSWORDSA,

    /* Test*/
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes
  };