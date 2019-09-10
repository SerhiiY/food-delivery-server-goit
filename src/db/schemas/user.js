const mongoose = require('mongoose');
const timestamp = require('../middleware/timestamp');

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  phone: String,
  location: String,
  favoriteProducts: Array, 
  viewedProducts: Array, 
  orders: Array
});

userSchema.plugin(timestamp);

const User = mongoose.model('users', userSchema);

module.exports = User;

// const userSchema = mongoose.Schema({
//   username: String,
//   email: 
//   {
//     type: String,
//     unique: true,
//     match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
//   },
//   password: 
//   {
//     type: String,
//     trim: true,
//     required: "Password is Required",
//     validate: [
//       function(input) {
//         return input.length >= 6;
//       },
//       "Password should be longer."
//     ]
//   },
//   phone: String,
//   location: String,
// });
