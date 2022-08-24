require("dotenv").config();
const {Router} = require('express');
const Stripe = require("stripe");
const router = Router();


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

        console.log(req.body);

        const amount = getAmount(products) * 100;
        
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            description: "ordernumber: 123231",
            payment_method: method_pay,
            confirm: true,
            receipt_email,
            shipping,
        });

        console.log(payment);
        res.status(201).send({message: "Successfull pay"});

    } catch (error) {
        res.status(404).send({message: error.message});
    }

});


module.exports = router;