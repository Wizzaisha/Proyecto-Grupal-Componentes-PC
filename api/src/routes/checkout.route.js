require("dotenv").config();
const {Router} = require('express');
const Stripe = require("stripe");
const router = Router();

const { Op } = require("sequelize");
const { OrderProduct, User } = require("../db");

const {
    STRIPE_S_KEY,
} = process.env;

const stripe = new Stripe(STRIPE_S_KEY);

const getAmount = (items) => {
    return items.map(e => e.price * e.quantity).reduce((curr, next) => curr + next, 0);
}


router.post("/", async (req, res, next) => {
    
    const { 
        method_pay, 
        products,
        customer,
        receipt_email,
        shipping,
    } = req.body;

    try {
        
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method: method_pay,
            confirm: true,
            shipping,
        });



        console.log(payment);
        res.status(201).send({message: "Successfull pay"});

    } catch (error) {
        res.status(404).send({message: error.message});
    }

});


module.exports = router;