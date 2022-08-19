const {Product,Category} = require("../db")

const obtenerProductos = async ()=>
{
let productos = await Product.findAll()
let toObj = []
productos?.map( async (e)=>
{
// let categoria = await Category.findByPk(e.categoryId,{ raw: true })
//  console.log(categoria.name)
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
        // category: categoria.name
       })
})
return toObj;
}
module.exports ={obtenerProductos}