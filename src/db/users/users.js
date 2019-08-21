const path = require('path');
const fs = require('fs-extra');

const usersRoute = (req, res, id) => {
  const reqMethod = req.method;

  if (reqMethod === 'GET') {
    
  } else

  if (reqMethod === 'POST') {
    res.writeHead(200, {"Content-type": "application/json"});
    console.log('Users POST');
    let data = '';

    req.on('data', (chunk) => {
      data += chunk.toString();
    });

    req.on('end', () => {
      const parsedData = JSON.parse(data);
      const userFilePath = path.join(__dirname, `${parsedData.email}.json`);
      
      fs.exists(userFilePath, (exists) => {
        console.log(exists);
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