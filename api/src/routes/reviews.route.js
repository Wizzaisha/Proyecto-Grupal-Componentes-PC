require("dotenv").config();
const {Router} = require('express');
const router = Router();
const Stripe = require("stripe");

const { Product, Review } = require("../db");

const {
    dataOrderControllerCustomer
} = require("../Middleware/orderLists.middleware");

const {
    STRIPE_S_KEY,
} = process.env;


const stripe = new Stripe(STRIPE_S_KEY);


router.get("/:email", async (req, res, next) => {

    const { email } = req.params;

    const productsUser = [];
    
    try {
        

        const findCustomer = await stripe.customers.search({
            query: `email:\'${email}\'`
        });
        
        const response = await stripe.paymentIntents.list({
            customer: findCustomer.data[0].id,
            limit: 100
        });

    
        const listPayments = await dataOrderControllerCustomer(response.data);

        listPayments.forEach(element => {
            
            element.productsOrdered.forEach(product => {
                if (productsUser.findIndex(e => e.id === product.id) === -1) productsUser.push(product);
            });
        });

        const findDbReviews = await Review.findAll({where: {
            emailUser: email
        }});


        productsUser.forEach(element => {

            const findPReviewIndex = findDbReviews.findIndex(item => item.productId === element.id);

            element["userReview"] = findPReviewIndex === -1 ? "" : findDbReviews[findPReviewIndex].userReview;
            element["userRating"] = findPReviewIndex === -1 ? 0 : findDbReviews[findPReviewIndex].userRating;
            element["idReview"] = findPReviewIndex === -1 ? 0 : findDbReviews[findPReviewIndex].id;
            
        });

        res.status(200).send(productsUser);

    } catch (error) {
        console.log(error);
        res.status(400).send({message: error.message});
    }
    


})


router.post("/:idProduct", async (req, res, next) => {
    const { userReview, userRating, emailUser, userName } = req.body;
    const { idProduct } = req.params;

    try {
        const reviewCreated = await Review.create({
            userReview,
            userRating,
            emailUser,
            userName
        });

        await reviewCreated.setProduct(idProduct);
        reviewCreated.save();

        const findProduct = await Product.findByPk(idProduct, { include: [{model: Review}] });

        const allReviews = findProduct.reviews.length;
        const totalRating = findProduct.reviews.map(e => e.userRating).reduce((curr, acc) => curr + acc, 0);
        
        findProduct.rating = Math.round(totalRating / allReviews);
        
        findProduct.save();

        res.status(201).send(reviewCreated);

    } catch (error) {
        res.status(400).send({message: error.message});
    }

});

router.put("/:idReview", async (req, res, next) => {

    const { idReview } = req.params;
    const { newRating, newReview, productId } = req.body;

    console.log(idReview);
    console.log(newRating);
    console.log(newReview);
    console.log(productId);

    try {

        const findProduct = await Product.findByPk(productId, { include: [{model: Review}] });

        const findReview = findProduct.reviews.find(e => e.id === parseInt(idReview));

        
        if (newRating && newReview) {

            findReview.userRating = newRating;
            findReview.userReview = newReview;

        } else if (newRating) {

            findReview.userRating = newRating;

        } else if (newReview) {
            
            findReview.userReview = newReview;
        }

        findReview.save();

        const allReviews = findProduct.reviews.length;
        const totalRating = findProduct.reviews.map(e => e.userRating).reduce((curr, acc) => curr + acc, 0);
        
        findProduct.rating = Math.round(totalRating / allReviews);
        findProduct.save();

        res.status(201).send(findReview);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
    
})



module.exports = router;