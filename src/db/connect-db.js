const mongoose = require('mongoose');

const connectToDB = (dbURL) => {
  mongoose.connect(dbURL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error('Database connection error')
    })
  
  mongoose.connection.on('connected', function () {  
    console.log('Mongoose connection open to ' + dbURL);
  }); 

  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose connection error: ' + err);
	  Process.exit(1);
  }); 

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose connection disconnected'); 
  });

};

module.exports = connectToDB;