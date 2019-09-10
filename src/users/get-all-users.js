const User = require('../db/schemas/user');

const getAllUsers = (request, response) => {
  const sendResponse = (users) => {
    response.status(200);
    response.json({status: 'success', users: users});
  };

  User
    .find()
    .then(sendResponse)
    .catch(err => {
      console.error(err);
    });
};

module.exports = getAllUsers;