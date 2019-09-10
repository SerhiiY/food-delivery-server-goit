const express = require('express');
const router = express.Router();
const Order = require('../db/schemas/order');

//-------------------------------------------------------------\\
const sendResponse = (order, response) => {
  response.status(200);
  response.json({"status":"success", "order":order});
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
      .then(order => sendResponse(order, response))
      .catch(err => sendError(err, response));
  })

  .get('/', (request, response) => {

    Order
      .find()
      .then(order => sendResponse(order, response))
      .catch(err => sendError(err, response));
  })

  .get('/:id', (request, response) => {

    const id = request.params.id;

    Order
      .findById(id)
      .then(order => sendResponse(order, response))
      .catch(err => sendError(err, response));
  })

module.exports = router;