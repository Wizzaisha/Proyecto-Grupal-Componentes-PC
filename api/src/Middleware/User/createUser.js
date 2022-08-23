const {User} = require("../../db")
var bcrypt = require("bcryptjs");

const crearUsuario = async ( username, email, password ) =>
{ 
let existe = await User.findOne({where: {username:username , email:email }})
if(existe) {console.log(username+", "+email+" ya existe!"); return 0 }
User.create(
    {
        username,
        email,
        password: bcrypt.hashSync(password, 8),
    })
    .then((u) =>{ u.setRoles([1])})
    return true;
}
module.exports = {crearUsuario}