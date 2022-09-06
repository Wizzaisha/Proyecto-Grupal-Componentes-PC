const { PRODUCTOS } = require("./productos")
const { crearProducto } = require("../Middleware/createProduct.middleware")
const { Product } = require("../db");

const productoSeeder = async () => {

    const response = await Product.findAll();

    if (response.length > 0){
        console.log("Los Productos ya estan cargados");
    } else {
        PRODUCTOS.map((e) => {
            crearProducto(e.brand, e.model, e.image, e.description, e.specs, e.benchmark, e.price, e.stock, e.category)
    
        })
        console.log("SeederProduct")
    }

}
module.exports = { productoSeeder }