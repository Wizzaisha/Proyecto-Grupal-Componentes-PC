const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const product = require ('./product.route')
const category = require ('./category.route')
const user = require ('./user.route')
const auth = require('./auth.route')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/productos', product)
router.use('/categorias', category)
router.use('/auth', auth)
router.use('/usuarios', user)

module.exports = router;