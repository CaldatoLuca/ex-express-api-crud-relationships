const CustomError = require("../exceptions/customError");

module.exports = (err, req, res, next) => {
  // controllo se è un mio errore custom
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      status: err.name,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    // se non è lanciato da me è un default 500
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: err.message,
    });
  }
};
