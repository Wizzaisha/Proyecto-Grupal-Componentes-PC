const {Product} = require("../db")
 

const eliminarProducto = async (id)=>
{
 
    let product = await Product.findByPk(id)
    
    product.isDeleted = !product.isDeleted;

    product.save();
    return true
}
module.exports ={eliminarProducto}