const startServer = require('./config/server');
const {port} = require('./config/config');

// const productsRouter = require('./src/routers/products-router');
// const usersRouter = require('./src/routers/users-router');

startServer(port);