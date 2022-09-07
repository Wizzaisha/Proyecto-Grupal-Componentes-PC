const {Product} = require("../db")
const {crearCategoria} = require('../Middleware/createCategory.middleware')

const crearProducto = async ( brand,model,image,description,specs,benchmark,price,stock,category)=>
{
let cat = await crearCategoria(category)
// let cat = await Category.findOrCreate({ where: {name: category}})
// console.log(cat.dataValues)
let existe = await Product.findOne({where: {brand:brand , model:model, description: description}})
if(existe) {console.log(brand+" "+model+" ya existe!"); return{flag : false , message :"Existing product!"}}
let producto = await Product.create(
    {
        brand:brand,
        model:model,
        image:image,
        description:description,
        specs: specs,
        benchmark: parseInt(benchmark),
        price:parseInt(price),
        stock:parseInt(stock),
    })

await producto.setCategory(cat)
producto.save();
return {flag : true , message :"Product created!"};
}
module.exports ={crearProducto}