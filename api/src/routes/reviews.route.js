const {Router} = require('express');
const router = Router();

const { Product, Review } = require("../db");

router.post("/:idProduct", async (req, res, next) => {
    const { userReview, userRating, emailUser } = req.body;
    const { idProduct } = req.params;

    try {
        const reviewCreated = await Review.create({
            userReview,
            userRating,
            emailUser
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

})



module.exports = router;