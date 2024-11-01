const { connect, connection } = require('mongoose');
// const path = require('path')
// require('dotenv').config({path:path.resolve(__dirname+'../../../.env')})
// configDotenv.load()
require('dotenv').config()
// console.log(process.env.MONGODB_URI)

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
const connectionString =
  process.env.MONGODB_URI;

// connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
connect(connectionString);

module.exports = connection;
