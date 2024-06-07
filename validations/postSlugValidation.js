const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ValidationError = require("../exceptions/validationError");

const slugValidation = {
  slug: {
    in: ["params"],
    isString: {
      errorMessage: "Slug must be a string",
    },
    custom: {
      options: async (value) => {
        const post = await prisma.post.findUnique({
          where: { slug: value },
        });
        if (!post) {
          throw new ValidationError(
            `Can't find a Post with slug ${value}`,
            404
          );
        }
        return true;
      },
    },
  },
};

module.exports = {
  slugValidation,
};
