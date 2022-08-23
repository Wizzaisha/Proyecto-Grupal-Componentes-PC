const {User} = require("../../db")
var bcrypt = require("bcryptjs");

const modificarUsuario = async (id, username, email, password ) => 
{ 
let existe = await User.findOne({where: {username:username , email:email }})
if(existe) {console.log("Username o email ya existente!"); return 0 }
User.findByPk(id)
    .then((u) =>
    { 
    username? u.username = username: username;
    email? u.email = email : email;
    password? u.password = bcrypt.hashSync(password, 8) : password;
    })
    return true;
}
module.exports = {modificarUsuario}