const {Product} = require("../db")
 

const eliminarProducto = async (id)=>
{
 
await Product.destroy({ where: { id } })
return true
}
module.exports ={eliminarProducto}