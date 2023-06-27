const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'something went wrong, Try again'
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.error).map((item) => item.message).join(','),
    customError.statusCode = 400
}



  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value ${Object.keys(err.KeyValue)} field, please cgose another value`,
      customError.statusCode = 400
  }

  if (err.name === 'CastError') {
    customError.msg = `No item with id: ${err.value}`,
      customError.statusCode = 400 
  }


  return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandlerMiddleware
