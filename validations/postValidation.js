const bodyValidations = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Title must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Title must be a string",
      bail: true,
    },
    custom: {
      options: (value) => {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(value);
      },
      errorMessage: "Title must not contain numbers or special characters",
    },
  },
};

// title, content, image, published, categoryId, tags

module.exports = {
  bodyValidations,
};
