const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();
// console.log(router); // --> is a function
// express.Router() will return a function that has .get,.post, etc.. and then all of this will run when app.use('/api/v1/tours', tourRouter);

// NOTE PARAM MIDDLEWARE and only specified in our tour router
// router. param() function calls the tourController.checkID function, it calls it with those variables, as in: tourController.checkID(req,res,next,value); (就像event handler)
router.param('id', tourController.checkID);

// 2. ROUTE HANDLERS

// route handler
// app.get('/api/v1/tours', getAllTours);

// 53 POST
// app.post('/api/v1/tours', createTour);

//54 :id -> variable ; 多個 :id/:x ; 選擇性 :id/:x/:y?
// app.get('/api/v1/tours/:id', getTour);

// 55 PATCH
// app.patch('/api/v1/tours/:id', updateTour);

// 56 DELETE
// app.delete('/api/v1/tours/:id', deleteTour);

// in this case we could chain (only for get and post)
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
