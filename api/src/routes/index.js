const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const product = require ('./product.route')
const category = require ('./category.route')
const user = require ('./user.route')
const checkout = require("./checkout.route")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/productos', product)
router.use('/categorias', category)
router.use('/usuarios', user)
router.use('/checkout', checkout)

module.exports = router;