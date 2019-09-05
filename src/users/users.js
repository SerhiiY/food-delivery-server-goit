const path = require('path');
const fs = require('fs-extra');

const usersRoute = (req, res, id) => {
  const reqMethod = req.method;

  if (reqMethod === 'GET') {
    const userFilePath = path.join(__dirname, `${id}.json`);
    
    fs.exists(userFilePath, (exists) => {
      if(!exists){
        res.writeHead(404, {"Content-type": "application/json"});
        res.end('User does not exist!');
      } else {
        res.writeHead(200, {"Content-type": "application/json"});
        fs.readFile(userFilePath, 'utf8').then(data => {
          const parsedData = JSON.parse(data);
          const stringData = JSON.stringify({"status": "success", "user": parsedData});
          res.end(stringData)
        });
      };
      
    }); //fs.exists

  } else

  if (reqMethod === 'POST') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk.toString();
    });

    req.on('end', () => {
      const parsedData = JSON.parse(data);
      const userFilePath = path.join(__dirname, `${parsedData.email}.json`);
      
      fs.exists(userFilePath, (exists) => {
        if(exists){
          res.end('User already exists!');
        } else {
          const stringData = JSON.stringify({"status": "success", "user": parsedData});
          fs.writeFileSync(userFilePath, data);
          res.end(stringData);
        };
        
      }); //fs.exists

    }); //req.on

  } //if POST

};

module.exports = usersRoute;