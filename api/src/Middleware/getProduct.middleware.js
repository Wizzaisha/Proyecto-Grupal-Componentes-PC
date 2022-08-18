const {Product,Category} = require("../db")

const getProducto = async ()=>
{
    
let productos = await Product.findAll( { include:{  model: Category, attributes:['name'] } })
let toObj = productos?.map((e)=>
{ console.log(e)
return {
        id: e.id,
        brand: e.brand,
        model: e.model,
        image: e.image,
        description: e.description,
        specs: e.specs,
        benchmark: e.benchmark,
        price: e.price,
        stock: e.stock,
       }
})
}
module.exports ={getProducto}