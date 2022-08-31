require("dotenv").config();
const {Router} = require('express');
const Stripe = require("stripe");
const router = Router();

const {
    dataOrderController,
} = require("../Middleware/orderLists.middleware");

const { obtenerProductos } = require("../Middleware/getProduct.middleware");

const {
    STRIPE_S_KEY,
} = process.env;

const stripe = new Stripe(STRIPE_S_KEY);

async function getOrderData () {
    const response = await stripe.paymentIntents.list({
        limit: 100
    });

    const listPayments = dataOrderController(response.data);

    return listPayments;
}

router.get("/", async (req, res, next) => {

    let dailyData = [];
    let topSelling = [];


    const data = await getOrderData();
    const dataProducts = await obtenerProductos();

    const amountData = data.map(order => {
        const date = new Date(order.created);

        const dateFormated = date.toLocaleDateString('en-US');
    
        return {
            created: dateFormated,
            amount: order.amount
        }
    });

    let productsSold = data.map(order => JSON.parse(order.metadata.productsOrdered)[0]);

    amountData.forEach(e => {
        const findIndexObj = dailyData.findIndex(item => item.day === e.created);
        if (findIndexObj === -1) {
            dailyData.push({day: e.created, totalAmount: e.amount});
        }
        else {
            dailyData[findIndexObj].totalAmount += e.amount;
        }

    });

    productsSold.forEach(element => {
        const findIndexObj = topSelling.findIndex(item => item.id === element.id);
        if (findIndexObj === -1) {
            topSelling.push({id: element.id, price: element.price/100, unitsSold: 1});
        }
        else {
            topSelling[findIndexObj].unitsSold += 1;
        }
    })

    const stockData = dataProducts.map(item => {
        return {
            id: item.id,
            stock: item.stock,
            name: `${item.brand} ${item.model}`
        }
    })

    res.status(200).send({
        dailyData,
        topSelling,
        stockData
    });
});

module.exports = router;