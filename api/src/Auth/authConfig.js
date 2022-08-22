const ROLES =require("../Seeders/roles")
module.exports = {
    secret: "Lomocompleto1-secret-key",
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours
    admin:ROLES.Admin,
    user2:ROLES.User_role,
    /* for test */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes
  };