const { checkSchema, validationResult } = require("express-validator");
const ValidationError = require("../exceptions/validationError");

module.exports = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        throw new ValidationError(errors.array()[0].msg, 400);
      }
      next();
    },
  ];
};
