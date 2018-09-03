const nodeBinance = require('node-binance-api');
const request = require('request');

const binance = new nodeBinance().options({
  APIKEY: 'NOPKqeiXNHS1wLnQKqY9clThFf0udOLreADlLNQoulnTEDnYtWl7viYYs5pCwE2c',
  APISECRET: 'tIBtvZbnjxKjXZls6tDiuzWd7ANhBlDtfAc5TgJ2EWPUQ3ln1IXhZIVBnKLVw3bT',
  useServerTime: true,
  recvWindow: 60000, // Set a higher recvWindow to increase response timeout
  verbose: true, // Add extra output when subscribing to WebSockets, etc
  log: log => {
    console.log(log); // You can create your own logger here, or disable console output
  }
});

function getPriceBTC(price) {
  binance.prices((error, ticker) => {
    return price(ticker.BTCUSDT);
  });
}

function getPriceMarket() {
  request({
    url:'https://api.coinmarketcap.com/v2/global/',
    json: true
  },(req,res,obj)=>{
    var p = obj.data.active_markets;
    console.log(p);
    return p;
  });
}


module.exports = {
  binance: binance,
  getPriceBTC: getPriceBTC,
  getPriceMarket: getPriceMarket
}
