const {Router} = require('express')
const { authJwt } = require("../Auth");
const {obtenerProductos,obtenerProductosById} = require('../Middleware/Product and Category/getProduct.middleware')
const {crearProducto} = require('../Middleware/Product and Category/createProduct.middleware')
const {modificarProducto} = require('../Middleware/Product and Category/updateProduct.middleware')
const {modificarStockProducto} = require('../Middleware/Product and Category/discountStok.middleware')
const {eliminarProducto} = require('../Middleware/Product and Category/deleteProduct.middleware')
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

router.post('/',/* [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], */ async (req, res, next)=>
{
    let {brand,model,image,description,specs,benchmark,price,stock,category}=req.body
    try
    {
    let productoCreado = await crearProducto(brand,model,image,description,specs,benchmark,price,stock,category)
    productoCreado? res.send("Producto creado")
    :res.send("Problema al crear el producto")
    }
    catch (error) { next(error)  }
})

router.put('/:id',/* [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], */ async (req, res, next)=>
{
    let {brand,model,image,description,specs,benchmark,price,stock,category}=req.body
    let {id} = req.params
    try
    {
    let productoModificado = await modificarProducto(id,brand,model,image,description,specs,benchmark,price,stock,category)
    productoModificado? res.send("Producto modificado")
    :res.send("Ya se encuentra la misma informacion guardada")
    }
    catch (error) { next(error)  }
})

router.put('/stock/:id',/* authJwt.verifyToken, */  async (req, res, next)=>
{
    let {descontar,cantidad}=req.body
    let {id} = req.params
    try
    {
    let modificarStock = await modificarStockProducto(id,descontar,cantidad)
    modificarStock? res.send("Stock modificado")
    :res.send("Error")
    }
    catch (error) { next(error)  }
})

router.delete('/:id',/* [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], */  async (req, res, next)=>
{
     let {id} = req.params
    try
    {
    let productoEliminar = await eliminarProducto(id)
    productoEliminar? res.send("Producto elminado")
    :res.send("Error al eliminar")
    }
    catch (error) { next(error)  }
})

module.exports = router