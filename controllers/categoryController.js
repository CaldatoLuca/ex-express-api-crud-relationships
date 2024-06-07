const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomError = require("../exceptions/customError");
const ValidationError = require("../exceptions/validationError");

const store = async (req, res, next) => {
  const { name } = req.body;

  const data = {
    name,
  };

  try {
    const category = await prisma.category.create({ data });

    res.status(200).json({
      message: "Category created successfully",
      category,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: +id },
    });

    if (!category) {
      return next(
        new ValidationError(`Can't find a Category with id ${id}`, 404)
      );
    }

    res.status(200).json({
      message: "Category found",
      category,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const index = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const offset = (page - 1) * limit;
  const totalItems = await prisma.category.count();
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages) {
    return next(new CustomError("La pagina richiesta non esiste.", 400));
  }

  try {
    const categories = await prisma.category.findMany({
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    res.status(200).json({
      message: `${categories.length} Categories found`,
      page: page,
      totalItems: `${categories.length}`,
      totalPages,
      categories,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = {
    name,
  };

  try {
    const checkCategory = await prisma.category.findUnique({
      where: { id: +id },
    });

    if (!checkCategory) {
      return next(
        new ValidationError(`Can't find a Category with id ${id}`, 404)
      );
    }

    const category = await prisma.category.update({
      where: { id: +id },
      data,
    });

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: +id },
    });

    if (!category) {
      return next(
        new ValidationError(`Can't find a Category with id ${id}`, 404)
      );
    }

    await prisma.category.delete({
      where: { id: +id },
    });

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

module.exports = {
  store,
  show,
  index,
  update,
  destroy,
};
