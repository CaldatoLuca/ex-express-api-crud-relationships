const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const validator = require("../middlewares/validator");
const { idValidation } = require("../validations/idValidation");
const { bodyValidations } = require("../validations/categoryValidation");

router.post("/", validator(bodyValidations), categoryController.store);
router.get("/", categoryController.index);

router.use("/:id", validator(idValidation));

router.get("/:id", categoryController.show);
router.put("/:id", validator(bodyValidations), categoryController.update);
router.delete("/:id", categoryController.destroy);

module.exports = router;
