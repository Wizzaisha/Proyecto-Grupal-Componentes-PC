const { Category} = require("../db")

const crearCategoria = async ( category)=>
{
let cat = await Category.findOrCreate({ where: {name: category}})
}
module.exports= {crearCategoria}