const { Comment} = require("../db")

const modificarComentario = async (comentario , commentId )=>
{
let comentary =  await Comment.findByPk(commentId)
   comentary.comentario = comentario
   comentary.save();
return {flag : true , message :"Comment was moddified"}
}
module.exports= {modificarComentario}