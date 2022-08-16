const express = require("express");

const { Products } = require("../db.js");

const router = express.Router();

router.get("/", async (req, res, next) => {

    const testdb = await Products.findAll();

    res.status(200).send(testdb);
});

router.post("/", async (req, res, next) => {

    const { name } = req.body;
    
    const test = await Products.create({
        name
    })

    res.send(test);
})

module.exports = router;