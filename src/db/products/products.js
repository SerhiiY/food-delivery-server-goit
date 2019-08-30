const path = require('path');
const fs = require('fs-extra');

const productsRoute = (req, res, id, param) => {
  const reqMethod = req.method;
  const productsFilePath = path.join(__dirname, 'all-products.json');

  if (reqMethod === 'GET') {

      if(id == null){
        res.writeHead(200, {"Content-Type": "application/json"});
        fs.createReadStream(productsFilePath, 'utf8').pipe(res);
      } 
      else if (typeof(id) === "string"){ //id: 123
        fs.readFile(productsFilePath, 'utf8')
        .then(data => {
          
          const parsedData = JSON.parse(data);
          const product = parsedData.find(el => el.id == id);

          if (product !== undefined) {
            res.writeHead(200, {"Content-Type": "application/json"});
            const stringData = JSON.stringify({"status": "success", "product": product});
            res.end(stringData);
          } else 
          {
            res.writeHead(404, {"Content-Type": "application/json"});
            const stringData = JSON.stringify({"status": "not found"});
            res.end(stringData);
          }
        });//readfile
      }//id: 123
      else { //id: [123, 456, 789] or [drinks, fastfood]
        fs.readFile(productsFilePath, 'utf8')
        .then(data => {
          const parsedData = JSON.parse(data);
          let products = [];

          const deleteKeys = (product) => {
            delete product.price
            delete product.currency
            delete product.creatorId
            delete product.created
            delete product.modified
            delete product.categories;
          }

          if(param === 'ids') {
            id.forEach((idEl) => {
              let product = parsedData.find(el => el.id == idEl);
                if(product === undefined) return;
                deleteKeys(product);
                return products.push(product);
            });
          }
          else if(param === 'category') {
            const productsArr = parsedData.filter(el => id.some(idEl => el.categories.includes(idEl) ) );
            products = products.concat(productsArr);
            products = products.sort((a, b) => a.id > b.id ? 1 : -1);
            products.forEach(product => deleteKeys(product))
          }

          if (products[0] !== undefined) {
            res.writeHead(200, {"Content-Type": "application/json"});
            const stringData = JSON.stringify({"status": "success", "products": products});
            res.end(stringData);
          } else 
          {
            res.writeHead(404, {"Content-Type": "application/json"});
            const stringData = JSON.stringify({"status": "no products", "products": products});
            res.end(stringData);
          }
        }); //readfile
      }//id: [123, 456, 789]
  } else //req method
  if (reqMethod === 'POST') {

    res.writeHead(200, {"Content-type": "application/json"});
    const productsFilePath = path.join(__dirname, '../src/db/products', `all-products.json`);
    const readable = fs.createReadStream(productsFilePath, 'utf8');
    
    let data = '';
    
    readable.on('data', (chunk) => {
      data += chunk.toString();
    });
    
    req.on('end', () => {
      const parsedData = JSON.parse(data);
      const product = parsedData.find(el => el.id == req.params.id);
      const stringData = JSON.stringify({"status": "success", "product": product});
      res.end(stringData);
    });

  }

};

module.exports = productsRoute;