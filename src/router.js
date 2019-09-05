const express = require('express');
const router = express.Router();

const productsRoute = require('./products/products-router');
const usersRoute = require('./users/users-router');
const ordersRoute = require('./orders/orders-router');
const mainRoute = require('./main/main-route');

router.use('/products', productsRoute);
router.use('/users', usersRoute);
router.use('/orders', ordersRoute);
router.use('/', mainRoute);

module.exports = router;