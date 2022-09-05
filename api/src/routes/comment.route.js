const {Router} = require('express')
const {obtenerComentariosPorProducto} = require('../Middleware/getComment.middleware')
const {crearComentario} = require('../Middleware/createComment.middleware')
const {modificarComentario} = require('../Middleware/updateComment.middleware') 
const {eliminarComentario} = require('../Middleware/deleteComment.middleware')
const {agregarRatingProducto}= require('../Middleware/addReatingProduct.middleware')

const router = Router()

router.get('/:productId', async (req, res, next)=>
{   let {productId} = req.params
    try
    {
    let comentarios = await obtenerComentariosPorProducto(productId)
    
    return res.send(comentarios) 
    }
    catch (error) { next(error) ; console.log(error) }
})

router.post('/:productId', async (req, res, next)=>
{
    let {comentario , email, rating}=req.body;
    let {productId} = req.params;

    try
    {
    let comentarioCreado = await crearComentario(comentario , email, productId)
    let productoCalificado = await agregarRatingProducto(productId, rating)
    comentarioCreado.flag? res.send(comentarioCreado.message)
    :res.send(comentarioCreado.message)
    }
    catch (error) { next(error)  }
})

router.put('/:commentId', async (req, res, next)=>
{
    let {comentario}=req.body
    let {commentId} = req.params
    try
    {
    let comentarioModificado = await modificarComentario(comentario , commentId )
    comentarioModificado.flag? res.send(comentarioModificado.message)
    :res.send(comentarioModificado.message)
    }
    catch (error) { next(error)  }
})

router.delete('/:commentId', async (req, res, next)=>
{
     let {commentId} = req.params
    try
    {
    let comentarioEliminar = await eliminarComentario(commentId)
    comentarioEliminar? res.send("Comment deleted")
    :res.send("Delete error")
    }
    catch (error) { next(error)  }
})

module.exports = router