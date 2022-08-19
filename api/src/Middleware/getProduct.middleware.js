const {Product,Category} = require("../db")

const obtenerProductos = async ()=>
{
let productos = await Product.findAll({ include: Category })
let toObj = []
productos?.map( async (e)=>
{
toObj.push ({
        id: e.id,
        brand: e.brand,
        model: e.model,
        image: e.image,
        description: e.description,
        specs: e.specs,
        benchmark: e.benchmark,
        price: e.price,
        stock: e.stock,
        category: e.category.name
        
       })
})
return toObj;
}
module.exports ={obtenerProductos}