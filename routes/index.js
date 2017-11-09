var express = require('express');
var app = express();
var router = express.Router();
var expressWs = require('express-ws')(app)

const Stocks = require('../models/Stocks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stocks Picker' });
});

// Route to manage finding stocks by tickers
router.ws('/', function(ws, req) {
  ws.on('message', async function(message){
    // Regex that finds a ticker according to user input.
    // ignores casing (ex. goog and GOOG are the same)
    const ticks = new RegExp('^'+message, 'i');
    const matchingStocks = await Stocks.find(
      { Ticker: { $regex: ticks }},
      {'Ticker': 1, 'Country': 1, 'Price': 1});

    // Wrap the resulting array of matched stocks to an object.
    const data = {
      payload: matchingStocks
    }

    // Pipe the data as a string through the socket.
    ws.send(JSON.stringify(data));
  });
});

module.exports = router;
