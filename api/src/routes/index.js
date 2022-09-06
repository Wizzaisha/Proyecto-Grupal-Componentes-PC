const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const product = require ('./product.route')
const category = require ('./category.route')
const user = require ('./user.route')
const checkout = require("./checkout.route")
const orderList = require("./OrderList.route");
const statistics = require("./statistics.route")
const question = require("./question.route");
const reviews = require("./reviews.route");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/productos', product)
router.use('/categorias', category)
router.use('/usuarios', user)
router.use('/reviews', reviews);
router.use('/checkout', checkout)
router.use("/order-list", orderList);
router.use("/statistics-data", statistics);
router.use("/question", question);

module.exports = router;