const express = require('express');
const router = express.Router();
const database = require('../data/db');
const fs = require('fs');   
const Purchase = require("../models/purchase")
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post("/", async (req, res, next) => {
    try{
        const purchase = req.body
        const newPurchase = await Purchase.recordPurchase(purchase)
        res.status(201).json({ purchase: purchase })

    } catch(err){
        next(err)
    }
})

module.exports = router;