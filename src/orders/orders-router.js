const express = require('express');
const router = express.Router();
const Order = require('../db/schemas/order');

//-------------------------------------------------------------\\
const sendResponse = (orders, response) => {
  response.status(200);
  response.json({"status":"success", "orders":orders});
};

const sendError = (err, response) => {
  console.log(err);
  response.status(400);
  response.json({"status": "error","error": err});
};
//-------------------------------------------------------------\\

router
  .post('/', (request, response) => {

    const order = request.body;
    const newOrder = new Order(order);

    newOrder
      .save()
      .then(orders => sendResponse(orders, response))
      .catch(err => sendError(err, response));
  })

  .get('/', (request, response) => {

    Order
      .find()
      .then(orders => sendResponse(orders, response))
      .catch(err => sendError(err, response));
  })

  .get('/:id', (request, response) => {

    const id = request.params.id;

    Order
      .findById(id)
      .then(orders => sendResponse(orders, response))
      .catch(err => sendError(err, response));
  })

module.exports = router;