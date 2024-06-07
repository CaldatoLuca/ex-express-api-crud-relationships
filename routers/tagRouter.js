const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");
const validator = require("../middlewares/validator");
const { idValidation } = require("../validations/idValidation");
const { bodyValidations } = require("../validations/tagValidation");

router.post("/", validator(bodyValidations), tagController.store);
router.get("/", tagController.index);

router.use("/:id", validator(idValidation));

router.get("/:id", tagController.show);
router.put("/:id", validator(bodyValidations), tagController.update);
router.delete("/:id", tagController.destroy);

module.exports = router;
