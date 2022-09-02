require("dotenv").config();
const {Router} = require('express');
const Stripe = require("stripe");
const router = Router();

const { Product } = require("../db");
const { obtenerProductosById } = require("../Middleware/getProduct.middleware");
const { sendEmail } = require("../Middleware/sendEmail.middleware");

const {
    STRIPE_S_KEY,
} = process.env;

const stripe = new Stripe(STRIPE_S_KEY);

const getTotalAmount = (items) => {
    return items.map(e => e.price * e.quantity).reduce((curr, next) => curr + next, 0);
}

const getDescription = async (items) => {

    const response = await Promise.all(
        items.map(async e => {
            let product = await obtenerProductosById(e.id);
            product["quantity"] = e.quantity;
            return product;
        })
    )
    
    const infoProduct = response.map(e => `${e.quantity} ${e.brand} ${e.model}`);
    
    return infoProduct;
}

const upDateStock = async (items) => {
    items.map(async e => {
        let product = await Product.findByPk(e.id);
        product.stock = product.stock - e.quantity;
        product.save();
    })
}

router.post("/", async (req, res, next) => {
    
    const { 
        method_pay, 
        products,
        customerEmail,
        shipping,
    } = req.body;

    try {
        
        // Email de test, se debe remplazar con el email que resulte de la bsuqueda por id
        const email = customerEmail;

        const amount = getTotalAmount(products);
        const description = await getDescription(products);
        
        let customerResponse = {};

        const findCustomer = await stripe.customers.search({
            query: `email:\'${email}\'`
        });

        if  (findCustomer.data.length === 0) {
            const createCustomer = await stripe.customers.create({
                email: email,
                "description": "customer"
            })
            customerResponse = createCustomer
        } else {
            customerResponse = findCustomer.data[0];
        }

        const payment = await stripe.paymentIntents.create({
            currency: "usd",
            confirm: true,
            payment_method: method_pay,
            metadata: {
                productsOrdered: JSON.stringify(products),
                orderStatus: "CREATED"
            },
            customer: customerResponse.id,
            receipt_email: customerResponse.email,
            amount,
            description: description.join(",\n"),
            shipping,
        });

        if (payment) {
            upDateStock(JSON.parse(payment.metadata.productsOrdered));
        }
        
        const receiptUrl = payment.charges.data[0].receipt_url;

        sendEmail(email, receiptUrl);

        res.status(201).send({message: "Successfull pay"});

    } catch (error) {
        res.status(404).send({message: error.message});
    }

});


module.exports = router;