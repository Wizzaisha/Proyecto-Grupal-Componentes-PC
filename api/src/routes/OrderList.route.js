require("dotenv").config();
const {Router} = require('express');
const Stripe = require("stripe");
const router = Router();
const { obtenerProductosById } = require("../Middleware/getProduct.middleware");


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


const getProductsInfo = async (items) => {
    
    let data = JSON.parse(items)
    
    await Promise.all(
        data.map(async e => {
            let product = await obtenerProductosById(e.id);
            e["image"] = product.image;
            e["brand"] = product.brand;
            e["model"] = product.model;
        })
    )

    return data;
};

const oneDataController = async (element) => {
    return {
        id: element.id,
        amount: element.amount,
        created: dateFormated(element.created),
        description: element.description,
        customer: element.customer,
        metadata: {
            orderStatus: element.metadata.orderStatus,
            productsOrdered: await getProductsInfo(element.metadata.productsOrdered)
        },
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
    
    const paymentDetails = await oneDataController(response);

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

    const data = await oneDataController(response);

    res.status(201).send(data);
})



module.exports = router;