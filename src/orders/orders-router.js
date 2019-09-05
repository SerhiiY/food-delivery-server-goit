const fs = require('fs-extra');
const path = require('path');
const shortId = require('shortid');

const express = require('express');
const router = express.Router();

const productsFilePath = path.join(__dirname, '../../data/products', 'all-products.json');

router.post('/', (req, res) => {
  const productsIds = req.body.products;
  
  const readable = fs.createReadStream(productsFilePath, 'utf8');

  let products = []; //[31,32,33]

  readable.on("data", data => {
    const parsedData = JSON.parse(data);

    productsIds.forEach(id => 
    {
      let product = parsedData.find(el => el.id == id);
      if(product === undefined) return;
      products.push(product.id);
    })

  }) //readable.on data

  readable.on('end', () => {
    if(products[0] === undefined) 
    {
      res.status(404);
      res.send(JSON.stringify({'status': 'failed', 'order': null}));
    } 
    else 
    {
      const userId = req.body.user;
      const orderId = shortId.generate();
      const userFolderPath = path.join(__dirname, '../../data/users', `${userId}`);
      const userOrderPath = path.join(userFolderPath, '/orders', `${orderId}.json`);

      fs.exists(userFolderPath, exists => {
        if(!exists) return res.send("User does not exist");

        const dataToWrite = req.body;
        dataToWrite.id = orderId;

        Promise.all([
          fs.exists(userFolderPath + '/orders', exists => {
            if(!exists) fs.mkdir(userFolderPath + '/orders').catch(error => console.error(error));
          }),
          fs.writeFile(userOrderPath, JSON.stringify(dataToWrite)).catch(error => console.error(error)),
        ]).then( () => 
          {
            res.status(200);
            res.send(JSON.stringify(  
              {
                "status": "success", 
                "order": dataToWrite
              }
            ));
          }).catch(error => console.error(error));

      }) //fs.exists
    } //products[0] !== undefined
  }) //readable.on end
}); //post order

module.exports = router;