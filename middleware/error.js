const ErrorResponse = require('./../utils/errorResponse');

function errorHandler(err, req, res, next) {
  let error = { ...err };
  // Mongoose bad object ID
  if (err.name === 'CastError') {
    const msg = `Resource was not found with ID of ${err.value}`;
    error = new ErrorResponse(msg, 404);
  }
  res.json({
    success: false,
    error: error.message || 'Server Error'
  });
}

module.exports = errorHandler;
