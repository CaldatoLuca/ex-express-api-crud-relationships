const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slugValidation = {
  slug: {
    in: ["params"],
    isString: {
      errorMessage: "Slug must be a string",
    },
    cusom: {
      options: async (value) => {
        const post = await prisma.post.findUnique({
          where: { slug: value },
        });
        if (post) {
          return false;
        }
        return true;
      },
      errorMessage: "Slug must be unique",
    },
  },
};

module.exports = {
  slugValidation,
};
