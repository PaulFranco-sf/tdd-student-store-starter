const express = require('express');
const router = express.Router();;
const {storage} = require('../data/storage');

router.get("/", async (req, res) => {
  const products = storage.get('products');
  console.log(products)
  res.status(200).json({ products });
})

router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = storage.get("products").find({id: Number(productId)})
  console.log(product);
  res.status(200).json({ product });
})

module.exports = router;