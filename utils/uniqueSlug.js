const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uniqueSlug = async (title) => {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  let slug = baseSlug;
  let existingPost = await prisma.post.findUnique({
    where: { slug: slug },
  });
  let count = 1;

  while (existingPost) {
    slug = `${baseSlug}-${count}`;
    existingPost = await prisma.post.findUnique({
      where: { slug: slug },
    });
    count++;
  }
  return slug;
};

module.exports = uniqueSlug;
