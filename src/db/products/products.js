const path = require('path');
const fs = require('fs-extra');

const productsRoute = (req, res, id) => {
  const reqMethod = req.method;

  if (reqMethod === 'GET') {

    const productsFilePath = path.join(__dirname, 'all-products.json');

    if(id == null){
      res.writeHead(200, {"Content-Type": "application/json"});
      fs.createReadStream(productsFilePath, 'utf8').pipe(res);
    } 
    else if (typeof(id) === "string"){
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
      });
    }
    else {
      fs.readFile(productsFilePath, 'utf8')
      .then(data => {
        const parsedData = JSON.parse(data);
        let products = [];
        id.forEach((id) => {
            let product = parsedData.find(el => el.id == id);
            if(product === undefined) return products.push({id: id, status: "Not found"});
            return products.push(product);
          });

        if (products !== "") {
          res.writeHead(200, {"Content-Type": "application/json"});
          console.log(products);
          const stringData = JSON.stringify({"status": "success", "products": products});
          res.end(stringData);
        } else 
        {
          res.writeHead(404, {"Content-Type": "application/json"});
          const stringData = JSON.stringify({"status": "not found"});
          res.end(stringData);
        }
      });

    }

  } else
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