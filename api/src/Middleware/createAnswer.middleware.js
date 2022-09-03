const {Question} = require("../db")
 
const crearRespuesta = async ( questionId, sendAdmin, emailAdmin)=>
{

let answer = await Question.findByPk(questionId)

answer.sendAdmin = sendAdmin
answer.emailAdmin = emailAdmin
answer.save();
return {flag : true , message :"Answer sent!"};
}
module.exports ={crearRespuesta}