const fs = require('fs-extra');
const path = require('path');

const express = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {

  const userFilePath = path.join(__dirname, '../../data/users', `${req.params.id}`, `${req.params.id}.json`);

  fs.exists(userFilePath, (exists) => { 
    if (!exists) return res.end("User doesn't exist!");  
    const readable = fs.createReadStream(userFilePath, 'utf8');
    readable.pipe(res);
  });
}); //get user


router.delete('/:id', (req, res) => {
  
  const userFolderPath = path.join(__dirname, '../../data/users/', `${req.params.id}`);

  fs.exists(userFolderPath, (exists) => { 
    if (!exists) return res.end("User doesn't exist!");  
    
    fs.remove(userFolderPath, (err) => {
      if(err) return res.end(err);
      res.end("User was deleted successfully!");
    });
  });
}); //delete user


router.post('/', (req, res) => {
  const userFolderPath = path.join(__dirname, '../../data/users', `${req.body.id}`);
  const userFilePath = path.join(userFolderPath, `${req.body.id}.json`);
  
  fs.exists(userFolderPath, (exists) => { 

    if (exists) return res.end("User already exists!");  
    if (req.body.id === undefined) return res.end("Request have not got user's ID!");
    
    fs.mkdir(userFolderPath)
    .then(() => 
    {
      fs.writeFile(userFilePath, JSON.stringify(req.body)).catch(error => console.error(error));
      res.send(JSON.stringify(
        {
        "status": "success", 
        "user": req.body
        }
      ));
    }).catch(error => console.error(error));
  });
}); //post new user

module.exports = router;