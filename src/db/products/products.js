const path = require('path');
const fs = require('fs-extra');

const productsRoute = (req, res, id) => {
  const reqMethod = req.method;

  if (reqMethod === 'GET') {

    res.writeHead(200, {"Content-Type": "application/json"});
    const productsFilePath = path.join(__dirname, 'all-products.json');

    if(id == null){
      fs.createReadStream(productsFilePath, 'utf8').pipe(res);
    } else
    {
      fs.readFile(productsFilePath, 'utf8')
      .then(data => {
        
        const parsedData = JSON.parse(data);
        const product = parsedData.find(el => el.id == id);

        if (product !== undefined) {
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