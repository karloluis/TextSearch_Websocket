const mongoose = require('mongoose');

const StocksSchema = new mongoose.Schema({
  'Ticker': {type: String},
  'Sector': {type: String},
  'Change from Open': {type: Number},
  'Performance (YTD)': {type: Number},
  'Performance (Week)': {type: Number},
  'Performance (Quarter)': {type: Number},
  '200-Day Simple Moving Average': {type: Number},
  '52-Week High': {type: Number},
  'Change': {type: Number},
  'Volatility (Week)': {type: Number},
  'Country': {type: String},
  '50-Day Low': {type: Number},
  'Price': {type: Number},
  '50-Day High': {type: Number},
  'Dividend Yield': {type: Number},
  'Industry': {type: String},
  '52-Week Low': {type: Number},
  'Average True Range': {type: Number},
  'Company': {type: String},
  'Gap': {type: Number},
  'Relative Volume': {type: Number},
  'Volatility (Month)': {type: Number},
  'Volume': {type: Number},
  'Short Ratio': {type: Number},
  'Performance (Half Year)': {type: Number},
  'Relative Strength Index (14)': {type: Number},
  '20-Day Simple Moving Average': {type: Number},
  'Performance (Month)': {type: Number},
  'Performance (Year)': {type: Number},
  'Average Volume': {type: Number},
  '50-Day Simple Moving Average': {type: Number},

});

const Stocks = mongoose.model('Stocks', StocksSchema);

module.exports = Stocks;
