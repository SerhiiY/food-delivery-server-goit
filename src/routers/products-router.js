const fs = require('fs-extra');
const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const productsFilePath = path.join(__dirname, '../db/products', 'all-products.json');
  const readable = fs.createReadStream(productsFilePath, (err => {
    if(err) res.end(err);
  }));
  readable.pipe(res);
});

module.exports = router;