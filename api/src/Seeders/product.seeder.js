const {PRODUCTOS} = require( "./productos")
const{crearProducto} = require( "../Middleware/Product and Category/createProduct.middleware")

const productoSeeder= ()=> {
    PRODUCTOS.map((e)=> 
    {
     crearProducto(e.brand,e.model,e.image,e.description,e.specs,e.benchmark,e.price,e.stock,e.category)
    
    })
    console.log("SeederProduct")
}
module.exports ={productoSeeder}