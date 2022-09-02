const {Router} = require('express')
const {obtenerProductos,obtenerProductosById} = require('../Middleware/getProduct.middleware')
const {crearProducto} = require('../Middleware/createProduct.middleware')
const {modificarProducto} = require('../Middleware/updateProduct.middleware')
const {modificarStockProducto} = require('../Middleware/discountStok.middleware')
const {eliminarProducto} = require('../Middleware/deleteProduct.middleware')
const router = Router()

router.get('/', async (req, res, next)=>
{
    try
    {
        let productos = await obtenerProductos()
        productos.length > 0 ?
        res.send(productos): res.send({ message:"No products"})
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
    productoCreado.flag? res.send(productoCreado.message)
    :res.send(productoCreado.message)
    }
    catch (error) { next(error)  }
})

router.put('/:id', async (req, res, next)=>
{
    let {brand,model,image,description,specs,benchmark,price,stock,category}=req.body
    let {id} = req.params
    try
    {
    let productoModificado = await modificarProducto(id,brand,model,image,description,specs,benchmark,price,stock,category)
    productoModificado.flag? res.send(productoModificado.message)
    :res.send(productoModificado.message)
    }
    catch (error) { next(error)  }
})

router.put('/stock/:id', async (req, res, next)=>
{
    let {descontar,cantidad}=req.body
    let {id} = req.params
    try
    {
    let modificarStock = await modificarStockProducto(id,descontar,cantidad)
    modificarStock? res.send("Stock was modified")
    :res.send("Error")
    }
    catch (error) { next(error)  }
})

router.delete('/:id', async (req, res, next)=>
{
     let {id} = req.params
    try
    {
    let productoEliminar = await eliminarProducto(id)
    productoEliminar? res.send("Product deleted")
    :res.send("Delete error")
    }
    catch (error) { next(error)  }
})

module.exports = router