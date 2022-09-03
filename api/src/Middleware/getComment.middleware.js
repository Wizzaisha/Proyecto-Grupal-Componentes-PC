const {Comment,Product} = require("../db")
const obtenerComentariosPorProducto = async (productId)=>
{
    let comentarios = await Comment.findAll({include:[{ model: Product , where: { id: productId } }]})
    let toObj = []
    comentarios?.map(  (e)=>
    { 
        // console.log(e.category.name)
    toObj.push ({
            email: e.email,
            comment: e.comentario,
           })
    })
    return toObj;
}
module.exports ={obtenerComentariosPorProducto}