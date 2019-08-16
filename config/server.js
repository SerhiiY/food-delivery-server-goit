const http = require('http');
const fs = require('fs-extra');
const path = require('path');


const startServer = port => {
  const server = http.createServer((req, res) => {
});

  server.on('request', (req, res) => {
      
    if(req.method === 'GET'){

      if(req.url === '/products'){
        res.writeHead(200, {"Content-type": "application/json"});

        const productsFilePath = path.join(__dirname, '../src/db/products', 'all-products.json');
        fs.createReadStream(productsFilePath, 'utf8').pipe(res);
      } else { 
        res.end('Route is not found!');
      };

    } else if(req.method === 'POST'){
      
      if(req.url === '/signup'){
        res.writeHead(200, {"Content-type": "application/json"});

        let data = '';

        req.on('data', (chunk) => {
          data += chunk.toString();
        });

        req.on('end', () => {
          const parsedData = JSON.parse(data);
          const userFilePath = path.join(__dirname, '../src/db/users', `${parsedData.email}.json`);
          
          fs.exists(userFilePath, (exists) => {
            
            if(exists){
              res.end('User already exists!');
            } else {
            const stringData = JSON.stringify({"status": "success", "user": parsedData});
            fs.writeFileSync(userFilePath, data);
            res.end(stringData);
            };
            
          });

        });

      } else {
        res.end('Route is not found!')
      };

    } else {
      res.end('Route is not found!')
    };
    
  });

  server.listen(port, (err) => {
    if (err) return console.log('Something is going wrong:', err);
    console.log(`Server is listening on ${port}`);
  });

};
module.exports = startServer;