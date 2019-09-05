const fs = require('fs-extra');
const path = require('path');

const express = require('express');
const router = express.Router();

const productsFilePath = path.join(__dirname, '../../data/products', 'all-products.json');

router.get('/', (req, res) => {
  const readable = fs.createReadStream(productsFilePath, 'utf8');

  const keys = Object.keys(req.query);
  let key = keys[0]; //'ids' or 'category'

  if(key === undefined) readable.pipe(res);
  else {
    let values = req.query[key]; //'31, 32,33'
    const valuesArr = getValuesArray(values); //[31,32,33]
    let products = [];

    readable.on("data", data => {
      const parsedData = JSON.parse(data);

      if(key === "ids") 
      {
        valuesArr.forEach(id => 
        {
          let product = parsedData.find(el => el.id == id);
          if(product === undefined) return;
          product = deleteProductKeys(product);
          products.push(product);
        })
      } //key === ids
      else if(key === 'category') 
      {
        const productsArr = parsedData.filter(el => valuesArr.some(value => el.categories.includes(value) ) );
        products = productsArr.sort((a, b) => a.id > b.id ? 1 : -1);
        products.forEach(product => product = deleteProductKeys(product));
      } //key === category
    }) //readable.on data 

    readable.on("end", () => {
      if (products[0] !== undefined) 
      {
        const stringData = JSON.stringify({"status": "success", "products": products});
        res.end(stringData);
      } 
      else {
        const stringData = JSON.stringify({"status": "no products", "products": products});
        res.end(stringData);
      };
    }); //readable.on end
  }; //if query.key !== {}

  readable.on('error', (error) => {
    console.log(error);
    res.writeHead(500)
    res.send(`Internal server error!`)
  });

}); //router.get "/"

router.get('/:id', (req, res) => {

  const readable = fs.createReadStream(productsFilePath, "utf8");
  let elemById;

  readable.on("error", error => {
    console.error(error);
    res.send(`Internal server error!`)
  });

  readable.on('data', (data) => {
    const parsedData = JSON.parse(data);
    elemById = parsedData.filter(el => el.id == req.params.id);

    if(elemById[0] !== undefined) {
      res.send(JSON.stringify(
        {
        "status": "success", 
        "products": elemById
        }
      ));
      readable.destroy();
    } 
  }); //readable on data

  readable.on("end", () => {
    res.send(JSON.stringify(
      {
      "status": "no products", 
      "products": elemById
      }
    ));
  }); //readable on end
});

function getValuesArray(values) {
  return values = 
  values.replace(/[`'"\s+]/g,"").split(',');
}

function deleteProductKeys (product) {
  const newProduct = product;
  delete newProduct.price
  delete newProduct.currency
  delete newProduct.creatorId
  delete newProduct.created
  delete newProduct.modified
  delete newProduct.categories;
  return newProduct;
}

module.exports = router;