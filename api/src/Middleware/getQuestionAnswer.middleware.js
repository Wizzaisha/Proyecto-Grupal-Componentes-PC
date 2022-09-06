const {Question,Product} = require("../db")
 
const mostrarCuestionario = async ( productId)=>
{

let cuestionario = await Question.findAll({include:[{ model: Product , where: { id: productId } }]})
if(cuestionario){return {flag : true , cuestionario}}

else{return {flag : false , message :"Questionnaire null!"}}
}
module.exports ={mostrarCuestionario}