const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slugValidation = {
  slug: {
    in: ["params"],
    isString: {
      errorMessage: "Slug must be a string",
    },
  },
};

module.exports = {
  slugValidation,
};
