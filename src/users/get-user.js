const User = require('../db/schemas/user');

const getUser = (request, response) => {

  const id = request.params.id;

  const sendResponse = (user) => {
    if(user === null){
      response.status(404);
      response.json({status: "not found"});
    }else{
      response.status(200);
      response.json({status: 'success', user: user});
    }
  };

  User
    .findById(id)
    .then(sendResponse)
    .catch(err => {
      console.error(err)
    });
};

module.exports = getUser;