const mainRoute = require('./main/main');
const productsRoute = require('./products/products');
const usersRoute = require('./users/users');

const router = {
  '/products': productsRoute,
  '/users': usersRoute,
  default: mainRoute
};

module.exports = router;