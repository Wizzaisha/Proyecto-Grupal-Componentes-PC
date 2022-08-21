const {Product} = require("../db")
const {crearCategoria} = require('../Middleware/createCategory.middleware')

const modificarProducto = async ( id, brand,model,image,description,specs,benchmark,price,stock,category)=>
{
let producto = await Product.findByPk(id)
if(category) 
{
const categoryToBeRemoved = await producto.getCategory()
await producto.removeCategory(categoryToBeRemoved)
var cat = crearCategoria(category)
}

let existe = await Product.findOne({where: {brand:brand , model:model, description: description,specs:specs}})
if(existe) {console.log(brand+" "+model+" ya existe!"); return 0 }
brand ? producto.brand = brand : brand
model ?   producto.model = model : model
image ? producto.image = image : image
description ? producto.description = description : image
specs ? producto.specs = specs : specs
benchmark ? producto.benchmark = benchmark : benchmark
price ? producto.price = price : price
stock ? producto.stock = stock : stock
category ? await producto.setCategory(cat) : category

producto.save();

}
module.exports ={modificarProducto}