const {User,Role} = require("../../db")

const obtenerUsuarios = async (email)=>
{
let usuarios = await User.findAll({ include: Role })
var toObj = []
if (email){ toObj = User.findOne({ include: Role }, {where: { email: email}})}
usuarios?.map(  (e)=>
{ 
toObj.push ({
        id: e.id,
        username: e.username,
        email: e.email
       })
})
return toObj;
}
const obtenerUsuariosById = async (id)=>
{
let e = await User.findByPk(id,{ include: Role })

const usuario = {
    id: e.id,
    username: e.username,
    email: e.email,
    roles: e.roles?.map((r)=>{r.name})
};

return usuario;
}
module.exports ={obtenerUsuarios,obtenerUsuariosById}