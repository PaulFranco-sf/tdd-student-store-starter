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

router.get("/", async (req, res, next) => {
    try{
        const purchases = await Purchase.listPurchases()
        res.status(200).json({ purchases })
    } catch(err){
        next(err)
    }
})


router.delete("/", async (req, res, next) => {
    // const orderId = req.params.id
    console.log(req.params)
    // console.log(orderId)
    // try{
    //     const deletedOrder = await Purchase.deletePurchase()
    //     res.status(200).send(orderId)
    // } catch(err){
    //     next(err)
    // }
})

module.exports = router;