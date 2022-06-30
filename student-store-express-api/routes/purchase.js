const express = require('express');
const router = express.Router();
const { db } = require('../data/db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post("/", (req, res) => {
  res.status(200)
  res.send(req.body)
  const purchaseData = req.body
  console.log(purchaseData)
})

module.exports = router;