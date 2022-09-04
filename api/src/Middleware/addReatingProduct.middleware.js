const {Product} = require("../db")
 

const agregarRatingProducto = async ( id, rating)=>
{
let producto = await Product.findByPk(id)


    let p = producto.points
    if (p === null || p === undefined){ p = 0}
    p += rating
    let b = producto.buyers
    if (b === null || b === undefined){ b = 1}
    else {b++}
    producto.points = p
    producto.buyers = b

producto.save();
return {flag : true , message :"The product was ratinged!"};
}
module.exports ={agregarRatingProducto}