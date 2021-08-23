const dotenv = require('dotenv');

// NOTE order issue here since would be fixed on video 94
dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env);

// 4. START SERVER
//  default to localhost
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
