const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

// 路由器（Router）
// 路由（Routing）

// app.use('/api/v1/tours', tourRouter); is to mount tourRouter (a middleware function) at the '/api/v1/tours' (a specified path);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
