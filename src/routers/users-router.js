const fs = require('fs-extra');
const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  const productsFilePath = path.join(__dirname, '../db/users', `${req.params.id}.json`);

  fs.existsSync(productsFilePath, (exists) => { 
    if (!exists) return res.end("User doesn't exist!");  
    const readable = fs.createReadStream(productsFilePath);
    readable.pipe(res);
  });

});

router.delete('/:id', (req, res) => {
  const productsFilePath = path.join(__dirname, '../db/users', `${req.params.id}.json`);
  
  fs.existsSync(productsFilePath, (exists) => { 
    if (!exists) return res.end("User doesn't exist!");  
    
    fs.unlink(productsFilePath, (err) => {
      if(err) return res.end(err);
      res.end("User was deleted successfully!");
    });

  });

});


// Следующая функция записывает данные пользователя в отдельный файл, если он ещё не существует
// Имя файла (идентификатор) в данном случае - это е-меил, поэтому ключ должен быть обязательно

router.post('/', (req, res) => {
  const productsFilePath = path.join(__dirname, '../db/users', `${req.body.email}.json`);

  fs.existsSync(productsFilePath, (exists) => { 
    if (exists) return res.end("User already exists!");  
    
    fs.writeFile(productsFilePath, JSON.stringify(req.body));
    res.end(JSON.stringify(
      {
      "status": "success", 
      "user": req.body
      }
    ));

  });

});

module.exports = router;