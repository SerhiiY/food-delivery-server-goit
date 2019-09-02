const express = require('express');
const router = express.Router();

const productsRoute = require('./products/products-router');
const usersRoute = require('./users/users-router');

router.use('/products', productsRoute);
router.use('/users', usersRoute);
