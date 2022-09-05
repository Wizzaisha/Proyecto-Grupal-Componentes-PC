const {Product,Category,Review} = require("../db")

const obtenerProductos = async ()=>
{
let productos = await Product.findAll({ include: [{model: Category}, {model: Review}] })
let toObj = []
productos?.map(  (e)=>
{ 
    // console.log(e.category.name)
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
        rating: e.rating,
        category: e.category.name,
        isDeleted: e.isDeleted,
        rating: e.rating,
        reviews: e.reviews
       })
})
return toObj;
}
const obtenerProductosById = async (id)=>
{
let e = await Product.findByPk(id, { include: [{model: Category}, {model: Review}] } )

const producto = {
    id: e.id,
    brand: e.brand,
    model: e.model,
    image: e.image,
    description: e.description,
    specs: e.specs,
    benchmark: e.benchmark,
    price: e.price,
    stock: e.stock,
    rating: e.rating,
    category: e.category.name,
    isDeleted: e.isDeleted,
    rating: e.rating,
    reviews: e.reviews
};

return producto;
}
module.exports ={obtenerProductos,obtenerProductosById}