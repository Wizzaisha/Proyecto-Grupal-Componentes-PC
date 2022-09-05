const { Comment} = require("../db")

const eliminarComentario = async ( commentId )=>
{
    await Comment.destroy({ where: { id : commentId } })
    return true
}
module.exports= {eliminarComentario}

 