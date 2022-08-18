const {Product,Category} = require("../db")

const crearProducto = async ( background_image,marca,modelo,precio,description,bentchmark,especificaciones,categoria,stock)=>
{
let producto = await Product.create(
    {
        marca:marca,
        modelo:modelo,
        imagen:background_image,
        descripcion:description,
        especificaciones: especificaciones,
        benchmark:bentchmark,
        precio:precio,
        stock:stock,
    })
    let cat = await Category.findOrCreate({ where: {name: categoria}})
    await producto.addCategory(cat[0])
}
module.exports ={crearProducto}