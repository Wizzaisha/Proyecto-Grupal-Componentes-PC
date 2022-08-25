require("dotenv").config();
const {Router} = require('express');
const Stripe = require("stripe");
const router = Router();


const {
    STRIPE_S_KEY,
} = process.env;


const dateFormated = (dateToConvert) => {
    const date = new Date(dateToConvert * 1000);

    const result = date.toLocaleString();
    
    return result;
}

const dataOrderController = (data) => {
    return data.map(element => {
        return {
            id: element.id,
            amount: element.amount,
            created: dateFormated(element.created),
            customer: element.customer,
            metadata: element.metadata,
            payment_method: element.payment_method,
            receipt_email: element.receipt_email,
            shipping: element.shipping
        }
    });
};

const oneDataController = (element) => {
    return {
        id: element.id,
        amount: element.amount,
        created: dateFormated(element.created),
        customer: element.customer,
        metadata: element.metadata,
        payment_method: element.payment_method,
        receipt_email: element.receipt_email,
        shipping: element.shipping
    }
}

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

    const paymentDetails = oneDataController(response);


    res.status(200).send(paymentDetails);
})

//Get payments of a customer using the id
router.get("/customer/:idCustomer", async (req, res, next) => {

    const { idCustomer } = req.params;

    const response = await stripe.paymentIntents.list({
        customer: idCustomer,
        limit: 100
    });

    const listPayments = dataOrderController(response.data);

    res.status(200).send(listPayments);
});

router.post("/:idPayment", async (req, res, next) => {
    const { idPayment } = req.params;
    const typeUpdate = req.body; 

    const response = await stripe.paymentIntents.update(
        idPayment,
        typeUpdate
    );

    res.status(201).send(response);
})



module.exports = router;