const Product = require('../db/schemas/product');

const express = require('express');
const router = express.Router();

//-------------------------------------------------------------\\
const sendResponse = (products, response) => {
  response.status(200);
  response.json({"status":"success", "products":products});
};

const sendError = (err, response) => {
  console.log(err);
  response.status(400);
  response.json({"status": "error","error": err});
};

const getValuesArray = (values) => {
  const valuesArr = values.replace(/[`'"\s+]/g,"").split(',');
  return valuesArr;
}
//-------------------------------------------------------------\\

router
//-------------------------------------------------------------
  .get('/', (request, response) => {

    const findBy = {};

    const keys = Object.keys(request.query);
    const key = keys[0]; //'ids' or 'category'

    if(key !== undefined) 
    {
    const values = request.query[key]; //'31, 32,33'
    const valuesArr = getValuesArray(values); //[31,32,33]

    if(key === "ids") findBy._id = valuesArr;
    if(key === "categories") findBy.categories = {$in: valuesArr};
    }

    Product
      .find(findBy)
      .then(products => sendResponse(products, response))
      .catch(err => sendError(err, response));
  })
//-------------------------------------------------------------
  .get('/:id', (request, response) => {

    const id = request.params.id;

    Product
      .findById(id)
      .then(order => sendResponse(order, response))
      .catch(err => sendError(err, response))
  })
//-------------------------------------------------------------
  .put('/:id', (request, response) => {

    const id = request.params.id;
    const product = request.body;

    Product
      .findOneAndUpdate(
        { _id: id }, 
        product, 
        { new: true } // вернуть обновленный документ
      )
      .then(order => sendResponse(order, response))
      .catch(err => sendError(err, response))
  })
//-------------------------------------------------------------
  .post('/', (request, response) => {

    let productsArr = [];
    const products = request.body;

    Promise.all(
      products.map( async product => {
        product = new Product(product);
        await product
        .save()
        .then(result => productsArr.push(result))
        .catch(err => sendError(err, response));
      })
    )
    .then(() => sendResponse(productsArr, response))
    .catch(err => sendError(err, response));
  })

module.exports = router;