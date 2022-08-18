const {Product,Category} = require("../db")

const crearProducto = async ( brand,model,image,description,specs,benchmark,price,stock,category)=>
{
let cat = await Category.findOrCreate({ where: {name: category}})
let producto = await Product.create(
    {
        brand:brand,
        model:model,
        image:image,
        description:description,
        specs: specs,
        benchmark:benchmark,
        price:price,
        stock:stock,
    })

await producto.setCategory(cat[0])
}
module.exports ={crearProducto}