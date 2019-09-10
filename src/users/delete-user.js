const User = require('../db/schemas/user');

const deleteUser = (request, response) => {
  const id = request.params.id;

  const sendResponse = (user) => {
    response.status(200);
    response.json({status: 'success', user_id: id});
  };

  User
    .findById(id)
    .remove()
    .then(sendResponse)
    .catch(err => {
      console.error(err);
      response.json({status: 'error', error: err})
    });
};

module.exports = deleteUser;