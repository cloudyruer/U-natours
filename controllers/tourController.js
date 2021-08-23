const fs = require('fs');

// convert to js object
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// param middleware so has access to the "value" (val)
exports.checkID = (req, res, next, val) => {
  // NOTE val for value -> would hold the value of the id parameter
  console.log(`Tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    // NOTE 這邊用return 直接退出 不讓後面的繼續執行
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  // end the request response cycle
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
      // tours: tours // in es6 如果一樣不用寫
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //convert to number
  const tour = tours.find((el) => el.id === id);

  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
      // tours: tours // in es6 如果一樣不用寫
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  const newTour = { id: newId, ...req.body }; //ES6

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 create
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // 204 no content
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
