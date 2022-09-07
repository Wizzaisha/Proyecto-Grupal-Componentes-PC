const {Router} = require('express');
const router = Router();


router.get("/", (req, res, next) => {

    res.json({message: "Welcome to the server of the project Henry Hardware",
    navigation: {
        product: "'/api/productos' route for product management",
        categories: "'/api/categorias' route for product categories management",
        usuarios: "'/api/usuario' route for users management",
        reviews: "'/api/reviews' route for the reviews management",
        checkout: "'/api/checkout' route for the payment management with stripe",
        orderList: "'/api/order-list' route for orders management",
        statistics: "'/api/statistics-data' route for statistics data",
        question: "'/api/question' route for question/answers management"
    }});

});


module.exports = router;