const {Router} = require('express')
const {obtenerProductos,obtenerProductosById} = require('../Middleware/getProduct.middleware')
const {crearProducto} = require('../Middleware/createProduct.middleware')
const router = Router()

router.get('/', async (req, res, next)=>
{
    try
    {
        let productos = await obtenerProductos()
        productos.length > 0 ?
        res.send(productos): res.send({ message:"No se encontraron los productos"})
    }
    catch (error) { next(error) ; console.log(error) }
})

router.get('/:id', async (req, res, next)=>
{   let {id} = req.params
    try
    {
        let producto = await obtenerProductosById(id)
    
       return res.send(producto) 
    }
    catch (error) { next(error) ; console.log(error) }
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