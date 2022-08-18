const {PRODUCTOS} = require( "./productos")
const{crearProducto} = require( "../Middleware/createProduct.middleware")

const productoSeeder= ()=> {
    PRODUCTOS.map((e)=> 
    {
     crearProducto(e.brand,e.model,e.image,e.description,e.specs,e.benchmark,e.price,e.stock,e.category)
    })
}
module.exports ={productoSeeder}