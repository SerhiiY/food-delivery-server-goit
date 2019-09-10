const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  currency: String,
  categories: Array,
  likes: Number
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
