// const fs = require('fs');
const Tour = require('../models/tourModel');

// convert to js object
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// param middleware so has access to the "value" (val)
// exports.checkID = (req, res, next, val) => {
//   // NOTE val for value -> would hold the value of the id parameter
//   console.log(`Tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     // NOTE 這邊用return 直接退出 不讓後面的繼續執行
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   // console.log(req.body);
//   // console.log(req.body.name);
//   // console.log(req.body.price);
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price 😎',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    // end the request response cycle
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
        // tours: tours // in es6 如果一樣不用寫
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id }); //short cut
    res.status(200).json({
      status: 'success',
      data: {
        tour,
        // tours: tours // in es6 如果一樣不用寫
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // NOTE call the method on the document
    // const newTour = new Tour({});
    // newTour.save(); // return a promise

    // NOTE call the method on the model itself (return a promise as well)
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //the update one will return
      runValidators: true, //run the validator again (schema one)
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    // 204 no content
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};
