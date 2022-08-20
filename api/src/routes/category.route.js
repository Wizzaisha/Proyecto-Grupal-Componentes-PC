const {Router} = require('express')
const {obtenerCategorias} = require('../Middleware/getCategory.middleware')
const router = Router()

router.get('/', async (req, res, next)=>
{
    try
    {
    let categorias = await obtenerCategorias()
    res.send(categorias)
    }
    catch (error) { next(error)  }
})

router.post('/', async (req, res, next)=>
{
    try
    {
    
    }
    catch (error) { next(error)  }
})

module.exports = router