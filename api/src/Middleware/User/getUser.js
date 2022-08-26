const {User,Role} = require("../../db")

const obtenerUsuarios = async (email)=>
{
let usuarios = await User.findAll({ include: Role })

var toObj = []
toObj = usuarios?.map(  (e)=>
{
   
return{
        id: e.id,
        username: e.username,
        email: e.email,
        roles: e.roles.map(r=>(r.name) )
       }
})
if (email)
{
    let infoName = toObj.find( e => e.email.includes(email) ) 
    if (infoName) {return infoName}
}
return toObj
}

const obtenerUsuariosById = async (id)=>
{
let e = await User.findByPk(id,{ include: Role })

const usuario = {
    id: e.id,
    username: e.username,
    email: e.email,
    roles: e.roles.map(r=>(r.name) )
    // roles: e.roles?.map( (r) => { return { r.name } } )
};

return usuario;
}
module.exports ={obtenerUsuarios,obtenerUsuariosById}