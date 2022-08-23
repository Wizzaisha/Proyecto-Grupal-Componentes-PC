const {User} =  require ("../db")
const  { userSA , emailSA ,  passwordSA ,} = require('../Auth/authConfig')
var bcrypt = require("bcryptjs");

function  seederUserSA() {
    User.create({
         username: userSA,
         email : emailSA,
         password : bcrypt.hashSync(passwordSA, 8),
    }).then((u)=>{ u.setRoles([3])})
 
    User.create({
      username: "admin",
      email : "admin@gmail.com",
      password : bcrypt.hashSync("admin1234", 8),
 }).then((u)=>{ u.setRoles([2])})

 User.create({
  username: "user",
  email : "user@gmail.com",
  password : bcrypt.hashSync("user1234", 8),
}).then((u)=>{ u.setRoles([1])})
    
      console.log("SeederSuperAdmin & admin user")
  }
  
  module.exports = {
    seederUserSA,
  };