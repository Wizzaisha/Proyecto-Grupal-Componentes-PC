const {Question,Product} = require("../db")
 
const crearPregunta = async ( productId, sendUser, emailUser)=>
{
let producto = await Product.findByPk(productId)
let fecha = new Date();
let question = await Question.create( {productId, sendUser, emailUser, fecha})

await question.setProduct(producto)
question.save();
return {flag : true , message :"Question sent!"};
}
module.exports ={crearPregunta}