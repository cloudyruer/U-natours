const app = require('./app');
// 4. START SERVER
//  default to localhost
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
