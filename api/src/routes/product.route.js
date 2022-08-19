const {Router} = require('express')
const {obtenerProductos} = require('../Middleware/getProduct.middleware')
const {crearProducto} = require('../Middleware/createProduct.middleware')
const router = Router()

router.get('/', async (req, res, next)=>
{
    try
    {
        let productos = await obtenerProductos()
        res.send(productos)
    }
    catch (error) { next(error)  }
})

router.post('/', async (req, res, next)=>
{
    let {brand,model,image,description,specs,benchmark,price,stock,category}=req.body
    try
    {
    let productoCreado = await crearProducto(brand,model,image,description,specs,benchmark,price,stock,category)
    res.send(productoCreado)
    }
    catch (error) { next(error)  }
})
module.exports = router