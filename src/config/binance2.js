
const nodeBinance = require('node-binance-api');
const request = require('request');
const User = require('../app/models/user');
let Binance = '';

console.log("Api Key:");

let key = 'NOPKqeiXNHS1wLnQKqY9clThFf0udOLreADlLNQoulnTEDnYtWl7viYYs5pCwE2c';
let secrect = 'tIBtvZbnjxKjXZls6tDiuzWd7ANhBlDtfAc5TgJ2EWPUQ3ln1IXhZIVBnKLVw3bT';
const binance = new nodeBinance().options({
 APIKEY: key,
 APISECRET: secrect,
 useServerTime: true,
 recvWindow: 60000, // Set a higher recvWindow to increase response timeout
 verbose: true, // Add extra output when subscribing to WebSockets, etc
 log: log => {
   console.log(log); // You can create your own logger here, or disable console output
 }
});
Binance = binance;

module.exports = {
 priceBTC: (callback) => {
   Binance.prices((error, ticker) => {
    callback(ticker.BTCUSDT);
  });
}

}
