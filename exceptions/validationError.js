class ValidationError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ValidationError";
  }
}

module.exports = ValidationError;
