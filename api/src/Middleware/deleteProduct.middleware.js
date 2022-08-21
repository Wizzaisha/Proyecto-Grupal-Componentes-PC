const {Product} = require("../db")
 

const eliminarProducto = async (id)=>
{
// let producto = await Product.findByPk(id)
// const categoryToBeRemoved = await producto.getCategory()
// await producto.removeCategory(categoryToBeRemoved)
// var cat = crearCategoria(category)
await Product.destroy({ where: { id } })
}
module.exports ={eliminarProducto}