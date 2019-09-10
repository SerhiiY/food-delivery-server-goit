const mongoose = require('mongoose');
const timestamp = require('../middleware/timestamp');

const orderSchema = mongoose.Schema({
  creator: String,        //userID
  productsList: [
    { 
      product: String,      //productID
      size: String,         //"M" || "XL" || "XXL"
      itemsCount: Number    
    }
  ],
  deliveryType: String,   //"delivery" || "office"
  deliveryAdress: String,
  sumToPay: Number,
  status: String          //"inProgress" || "declined" || "finished" || "failed"
 });

orderSchema.plugin(timestamp);

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
