const {User} = require("../../db")

const modificarRol = async ( id, admin ) => 
{
User.findByPk(id)
    .then((u) =>
    { 
        if (admin){   u.setRoles([]) ;   u.setRoles([2]) }
        else { {   u.setRoles([]) ;   u.setRoles([1]) }}
    })
    return true;
}
module.exports = {modificarRol}