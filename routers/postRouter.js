const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const validator = require("../middlewares/validator");
const { bodyValidations } = require("../validations/postValidation");

router.post("/", validator(bodyValidations), postController.store);
router.get("/:slug", postController.show);
router.get("/", postController.index);
router.put("/:slug", validator(bodyValidations), postController.update);
router.delete("/:slug", postController.destroy);

module.exports = router;
