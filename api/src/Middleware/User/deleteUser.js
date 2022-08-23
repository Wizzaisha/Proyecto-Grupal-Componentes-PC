const {User} = require("../../db")

const eliminarUsuario = async (id) => 
{ 
    User.destroy({ where: {  id, } })
    return true;
}
module.exports = {eliminarUsuario}