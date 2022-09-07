const {Router} = require('express')
const {crearRespuesta} = require('../Middleware/createAnswer.middleware')
const {crearPregunta} = require('../Middleware/createQuestion.middleware')
const {mostrarCuestionario} = require('../Middleware/getQuestionAnswer.middleware') 

const router = Router()

router.get('/:productId', async (req, res, next)=>
{   let {productId} = req.params
    try
    {
    let preguntasRespuestas = await mostrarCuestionario(productId)
    preguntasRespuestas.length? res.send(preguntasRespuestas)
    :res.send("no hay preguntas")
    }
    catch (error) { next(error) ; console.log(error) }
})

router.post('/user/:productId', async (req, res, next)=>
{
    let {sendUser, emailUser}=req.body
    let {productId} = req.params
    try
    {
    let pregunta = await crearPregunta( productId, sendUser, emailUser)
     res.send(pregunta.message)

    }
    catch (error) { next(error)  }
})

router.put('/admin/:questionId', async (req, res, next)=>
{
    let {sendAdmin, emailAdmin}=req.body
    let {questionId} = req.params
    try
    {
    let respuesta = await crearRespuesta(questionId, sendAdmin, emailAdmin)
    res.send(respuesta.message)
    }
    catch (error) { next(error)  }
})



module.exports = router