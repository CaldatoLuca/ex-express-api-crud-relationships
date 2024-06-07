const ValidationError = require("../exceptions/validationError");

const bodyValidations = {
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const regex = /^[a-zA-Z\s]+$/;

        if (!regex.test(value)) {
          throw new ValidationError(
            "Name must contain only letters and spaces",
            400
          );
        }

        return true;
      },
    },
  },
};

module.exports = {
  bodyValidations,
};
