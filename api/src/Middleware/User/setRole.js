const {User} = require("../../db")

const modificarRol = async ( id, admin ) => 
{
User.findByPk(id)
    .then(async (u) =>
    { 
        if (admin){  await u.setRoles([]) ; await  u.setRoles([2]) }
        else { {  await u.setRoles([]) ; await  u.setRoles([1]) }}
    })
    return true
}
module.exports = {modificarRol}