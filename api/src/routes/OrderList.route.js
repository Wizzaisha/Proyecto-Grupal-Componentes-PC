require("dotenv").config();
const {Router} = require('express');
const Stripe = require("stripe");
const router = Router();


const {
    STRIPE_S_KEY,
} = process.env;


const stripe = new Stripe(STRIPE_S_KEY);

router.get("/", async (req, res, next) => {




    res.send("Hola");
});


module.exports = router;