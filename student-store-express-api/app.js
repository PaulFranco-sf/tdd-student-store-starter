const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const store = require('./routes/store');
const purchase = require('./routes/purchase');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json() );
app.use('/store', store);
app.use('/purchase', purchase);
app.use(express.json());
app.use(morgan('tiny'));

app.get("/", (req, res) => {
  res.status(200).json({ping: "pong"});
})

module.exports = app;