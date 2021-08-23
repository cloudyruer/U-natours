// express is a function
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// console.log(tourRouter instanceof Function); //true

// add a bunch of methods to our app once called NOTE express is a function
const app = express();

//  1. Middleware NOTE order matter NOTE 都要呼叫next() 除非是送出回應的最後一個

// third party middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// middleware 把內容加入到req.body
app.use(express.json());

// NOTE 066  -> only work for static file
// no need public folder in the URL
// since we open up a URL that cannot find in any routes
// then it would look to that public folder we defined
// and sets that folder to the root
app.use(express.static(`${__dirname}/public`));

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
// 將路由套用至應用程式
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
