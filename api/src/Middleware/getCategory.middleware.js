const {Category} = require("../db")
const obtenerCategorias = async ()=>
{
let categorias = await Category.findAll()
let toObj = []
categorias?.map( (e)=>
{
// console.log(e.name)
toObj.push (e.name)
})

return toObj;
}
module.exports ={obtenerCategorias}