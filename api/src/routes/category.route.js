const {Router} = require('express')
const {obtenerCategorias,} = require('../Middleware/Product and Category/getCategory.middleware')
const {crearCategoria} = require('../Middleware/Product and Category/createCategory.middleware')
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
    let {category} = req.body
    try
    {
    let categoria = await crearCategoria(category)
        categoria? res.send("Categoria "+category+" agregado/a con exito")
        :res.send("Problema al agregar la categoria")
    }
    catch (error) { next(error)  }
})

module.exports = router