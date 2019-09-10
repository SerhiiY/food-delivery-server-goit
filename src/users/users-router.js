const express = require('express');
const router = express.Router();

const getAllUsers = require('./get-all-users');
const getUser = require('./get-user');
const createUser = require('./create-user');
const updateUser = require('./update-user');
const deleteUser = require('./delete-user');

router
  .get('/', getAllUsers)
  .get('/:id', getUser)
  .put('/:id', updateUser)
  .post('/', createUser)
  .delete('/:id', deleteUser);


module.exports = router;