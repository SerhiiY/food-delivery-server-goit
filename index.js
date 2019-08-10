const { port } = require('./config/config');

const productsRouter = require('./src/routers/products-router');
const usersRouter = require('./src/routers/users-router');

var cookieParser = require('cookie-parser');

const express = require('express');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(port, (err) => {
  if (err) {
      return console.log('Something was going wrond!', err)
  }
  console.log(`Server is listening on ${port}`)
});