var express = require('express');
var app = express();
var router = express.Router();
var expressWs = require('express-ws')(app)
const _ = require('lodash');

const Stocks = require('../models/Stocks');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stocks Picker' });
});

// Route to manage finding stocks by tickers
router.ws('/', function(ws, req) {
  ws.on('message', async function(dataPack){
    const dataPayload = JSON.parse(dataPack).payload;
    const tickers = dataPayload || [];
    // Regex that finds a ticker according to user input.
    // ignores casing (ex. goog and GOOG are the same)

    const matchingStocks = tickers.reduce( async function(stocks, ticker) {
      if (ticker == '') {
        return stocks;
      }
      const pattern = new RegExp('^'+ticker, 'i');
      let match = await Stocks.find(
        { Ticker: { $regex: pattern }},
        {'Ticker': 1, 'Country': 1, 'Price': 1})
        .exec();
      return await _.concat(await stocks, await match);
    }, []);

    // Wrap the resulting array of matched stocks to an object.
    const dataSend = {
      payload: _.uniq(await matchingStocks),
    }

    // Pipe the data as a string through the socket.
    ws.send(JSON.stringify(dataSend));
  });
});

module.exports = router;
