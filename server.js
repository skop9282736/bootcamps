const express = require('express');
const dotenv = require('dotenv');
const bootcampRoutes = require('./routes/bootcamps.route');
const { logger } = require('./middleware/logger.middleware');
const morgan = require('morgan');
const connectDB = require('./config/db');
var colors = require('colors');

const app = express();

// body parse
app.use(express.json());

// load env file
dotenv.config({ path: './config/config.env' });

// Connect to db
connectDB();

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5000;

// Routes
app.use('/api/v1/bootcamps', bootcampRoutes);

const server = app.listen(port, () =>
  console.log(`listening on http://localhost:${port}`.yellow.bold)
);

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection =>', error.message.red);
  server.close(() => process.exit(1));
});
