require("dotenv").config();
const {Router} = require('express');
const Stripe = require("stripe");
const router = Router();

const {
    dataOrderController,
    oneDataController,
    dataOrderControllerCustomer
} = require("../Middleware/orderLists.middleware");

const {
    STRIPE_S_KEY,
} = process.env;


const stripe = new Stripe(STRIPE_S_KEY);

// Get all payments;
router.get("/", async (req, res, next) => {

    const response = await stripe.paymentIntents.list({
        limit: 100
    });

    const listPayments = dataOrderController(response.data);

    res.status(200).send(listPayments);
});

router.get("/:idPayment", async (req, res, next) => {
    
    const { idPayment } = req.params;
    
    const response = await stripe.paymentIntents.retrieve(
        idPayment
    );
    
    const paymentDetails = await oneDataController(response);

    res.status(200).send(paymentDetails);
})

//Get payments of a customer using the id
router.get("/customer/:email", async (req, res, next) => {

    const { email } = req.params;

    const findCustomer = await stripe.customers.search({
        query: `email:\'${email}\'`
    });

    const response = await stripe.paymentIntents.list({
        customer: findCustomer.data[0].id,
        limit: 100
    });


    const listPayments = dataOrderControllerCustomer(response.data);

    console.log(listPayments);

    res.status(200).send(listPayments);
});

router.post("/:idPayment", async (req, res, next) => {
    const { idPayment } = req.params;
    const typeUpdate = req.body;
    
    const response = await stripe.paymentIntents.update(
        idPayment,
        typeUpdate
    );

    const data = await oneDataController(response);

    res.status(201).send(data);
})



module.exports = router;