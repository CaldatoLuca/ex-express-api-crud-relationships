const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const validator = require("../middlewares/validator");
const { bodyValidations } = require("../validations/postValidation");
const { slugValidation } = require("../validations/postSlugValidation");

router.post("/", validator(bodyValidations), postController.store);
router.get("/", postController.index);

router.use("/:slug", validator(slugValidation));

router.get("/:slug", postController.show);
router.put("/:slug", validator(bodyValidations), postController.update);
router.delete("/:slug", postController.destroy);

module.exports = router;
