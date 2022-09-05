const { Comment, Product} = require("../db")

const crearComentario = async (comentario , email, productId )=>
{
let producto =  await Product.findByPk(productId)
   let com =  await Comment.create({comentario , email});
   
    await com.setProduct(producto)
    com.save();
return {flag : true , message :"Comment successfully"}
}
module.exports= {crearComentario}