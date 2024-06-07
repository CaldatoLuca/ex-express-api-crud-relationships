const ValidationError = require("../exceptions/validationError");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  content: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Content must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Content must be a string",
      bail: true,
    },
  },
  image: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Image must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Image must be a string",
      bail: true,
    },
  },
  published: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Published must not be empty",
      bail: true,
    },
    isBoolean: {
      errorMessage: "Image must be a boolean",
      bail: true,
    },
  },
  categoryId: {
    in: ["body"],
    isInt: {
      errorMessage: "Category Id must be an integer",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const categoryId = parseInt(value);
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });
        if (!category) {
          throw new ValidationError(
            `Can't find a Category with id ${categoryId}`,
            404
          );
        }
        return true;
      },
    },
  },
  tags: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Tags must be not empty",
      bail: true,
    },
    isArray: {
      errorMessage: "Tags must be an array",
      bail: true,
    },
    custom: {
      options: async (ids) => {
        if (ids.length === 0) {
          throw new ValidationError(`Post must have at least a tag`, 400);
        }
        const notIntegerId = ids.find((id) => isNaN(parseInt(id)));
        if (notIntegerId) {
          throw new ValidationError(`All ids must be integer`, 400);
        }
        const tags = await prisma.tag.findMany({
          where: { id: { in: ids } },
        });
        if (tags.length !== ids.length) {
          throw new ValidationError(`Some ingredients were not found`, 404);
        }
        return true;
      },
    },
  },
};

module.exports = {
  bodyValidations,
};
