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
    const tag = await prisma.tag.create({ data });

    res.status(200).json({
      message: "Tag created successfully",
      tag,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const show = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tag = await prisma.tag.findUnique({
      where: { id: +id },
    });

    if (!tag) {
      return next(new ValidationError(`Can't find a Tag with id ${id}`, 404));
    }

    res.status(200).json({
      message: "Tag found",
      tag,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const index = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const offset = (page - 1) * limit;
  const totalItems = await prisma.tag.count();
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages) {
    return next(new CustomError("La pagina richiesta non esiste.", 400));
  }

  try {
    const tags = await prisma.tag.findMany({
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    res.status(200).json({
      message: `${tags.length} Tags found`,
      page: page,
      totalItems: `${tags.length}`,
      totalPages,
      tags,
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
    const checkTag = await prisma.tag.findUnique({
      where: { id: +id },
    });

    if (!checkTag) {
      return next(new ValidationError(`Can't find a Tag with id ${id}`, 404));
    }

    const tag = await prisma.tag.update({
      where: { id: +id },
      data,
    });

    res.status(200).json({
      message: "Tag updated successfully",
      tag,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tag = await prisma.tag.findUnique({
      where: { id: +id },
    });

    if (!tag) {
      return next(new ValidationError(`Can't find a Tag with id ${id}`, 404));
    }

    await prisma.tag.delete({
      where: { id: +id },
    });

    res.status(200).json({
      message: "Tag deleted successfully",
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
