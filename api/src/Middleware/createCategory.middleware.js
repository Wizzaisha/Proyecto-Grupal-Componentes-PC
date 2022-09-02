const { Category} = require("../db")

const crearCategoria = async (category)=>
{
let existe = await Category.findOne( { where: {name: category}})
if(existe){   /*console.log(category+" ya existe");*/  return existe;     }
else
{   return await Category.create({name: category.toUpperCase()})   }
 
}
module.exports= {crearCategoria}