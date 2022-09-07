const {Product} = require("../db")
const {crearCategoria} = require('../Middleware/createCategory.middleware')

const modificarProducto = async ( id, brand,model,image,description,specs,benchmark,price,stock,category)=>
{
let producto = await Product.findByPk(id)
/* let existe = await Product.findOne({where: {brand , model }})
if(existe.id === producto.id){ }
else{ return {flag : false , message :"Existing product!"} }
*/

brand ? producto.brand = brand : brand
model ?   producto.model = model : model
image ? producto.image = image : image
description ? producto.description = description : description
specs ? producto.specs = specs :specs
benchmark ? producto.benchmark = parseInt(benchmark) : benchmark
price ? producto.price = parseInt(price) : price
stock ? producto.stock = parseInt(stock) : stock
if(category)
{ let cat = await crearCategoria(category)
    await producto.setCategory(cat)
}
producto.save();
 
return {flag : true , message :'The product was modified!'};
}
module.exports ={modificarProducto}