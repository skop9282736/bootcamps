const ErrorResponse = require('./../utils/errorResponse');

function errorHandler(err, req, res, next) {
  let error = { ...err };
  console.log(error);
  // Mongoose bad object ID
  if (err.name === 'CastError') {
    const msg = `Resource was not found with ID of ${err.value}`;
    error = new ErrorResponse(msg, 404);
  }

  // Mongoose duplicate
  if (err.code === 11000) {
    const msg = `Duplicate key value entred`;
    error = new ErrorResponse(msg, 400);
  }

  // Mongoose validation error
  if ((error.name = 'ValidationError')) {
    const msg = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(msg, 400);
  }

  res.json({
    success: false,
    error: error.message || 'Server Error'
  });
}

module.exports = errorHandler;
