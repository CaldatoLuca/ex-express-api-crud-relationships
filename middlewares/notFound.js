module.exports = (req, res, next) => {
  const statusCode = 404;

  res.status(statusCode).json({
    status: "not found",
    message: "Page not found",
    statusCode: statusCode,
  });
};
