// express is a function
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// add a bunch of methods to our app once called NOTE express is a function
const app = express();

//  1. Middleware NOTE order matter NOTE 都要呼叫next()

// third party middleware
app.use(morgan('dev'));

// middleware 把內容加入到req.body
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello From The MiddleWare😁');
  next();
});

app.use((req, res, next) => {
  console.log('Hello From The MiddleWare😁😁');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   //NOTE in express .json 會直接改成輸出json 檔案 不用自己改檔頭
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// 3) ROUTES

// callback NOTE require from other module
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
