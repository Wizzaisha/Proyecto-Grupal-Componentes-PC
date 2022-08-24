const {User} = require("../../db")
var bcrypt = require("bcryptjs");

const modificarUsuario = async (id, username, email, password ) => 
{ 

if(email)
{let existe = await User.findOne({where: { email:email }})
if(existe) {  return {flag: false, message:"Email existente"}}}

if(username)
{let existe = await User.findOne({where: {username:username  }})
if(existe) { return {flag: false , message:"Username existente"} }}

User.findByPk(id)
    .then((u) =>
    { 
        if(username){u.username = username}
        if(email){u.email = email}
        if(password){u.password = bcrypt.hashSync(password, 8) }
         u.save();
    })
    return {flag: true};
}
module.exports = {modificarUsuario}