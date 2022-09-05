require("dotenv").config();
const { Router } = require('express');
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


    try {
        const response = await stripe.paymentIntents.list({
            limit: 100
        });

        const listPayments = dataOrderController(response.data);

        res.status(200).send(listPayments);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});

router.get("/:idPayment", async (req, res, next) => {

    const { idPayment } = req.params;

    const response = await stripe.paymentIntents.retrieve(
        idPayment
    );

    const paymentDetails = await oneDataController(response);


    try {

        const { idPayment } = req.params;

        const response = await stripe.paymentIntents.retrieve(
            idPayment
        );

        const paymentDetails = await oneDataController(response);

        res.status(200).send(paymentDetails);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }


})

//Get payments of a customer using the id
router.get("/customer/:email", async (req, res, next) => {

    try {

        const { email } = req.params;

        const findCustomer = await stripe.customers.search({
            query: `email:\'${email}\'`
        });

        const response = await stripe.paymentIntents.list({
            customer: findCustomer.data[0].id,
            limit: 100
        });

        const listPayments = await dataOrderControllerCustomer(response.data);

        res.status(200).send(listPayments);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }


});

router.post("/:idPayment", async (req, res, next) => {

    try {

        const { idPayment } = req.params;
        const typeUpdate = req.body;

        const response = await stripe.paymentIntents.update(
            idPayment,
            typeUpdate
        );

        const data = await oneDataController(response);

        res.status(201).send(data);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }

})



module.exports = router;