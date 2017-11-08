var express = require('express');
var app = express();
var router = express.Router();
var expressWs = require('express-ws')(app)

const Stocks = require('../models/Stocks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stocks Picker', pickedStocks: [] });
});

router.ws('/', function(ws, req) {
  ws.on('message', async function(message){
    const ticks = new RegExp('^'+message, 'i');
    const matchingStocks = await Stocks.find(
      { Ticker: { $regex: ticks }},
      {'Ticker': 1, 'Country': 1, 'Price': 1});

    const data = {
      payload: matchingStocks
    }

    ws.send(JSON.stringify(data));
  });
});

module.exports = router;
