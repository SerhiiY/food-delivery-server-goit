const fs = require('fs-extra');
const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const productsFilePath = path.join(__dirname, '../db/products', 'all-products.json');
  const readable = fs.createReadStream(productsFilePath, 'utf8');
  readable.pipe(res);
});

router.get('/:id', (req, res) => {
  const productsFilePath = path.join(__dirname, '../db/products', 'all-products.json');
  const readable = fs.createReadStream(productsFilePath, "utf8");

  readable.on('data', (data) => {
    const parsedData = JSON.parse(data);
    let elemById = parsedData.filter(el => el.id == req.params.id);
    res.send(JSON.stringify(
      {
      "status": "success", 
      "products": elemById
      }
    ));
    readable.destroy();
  });

});

module.exports = router;