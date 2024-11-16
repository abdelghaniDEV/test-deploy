const express = require("express");
const router = express.Router();
const Category = require("../module/category-module");
const { getAllCategories, createCategory, editCategory, deleteCategory } = require("../controller/category.controller");
const { authenticate } = require("../middleware/autMiddleware");

router.route("/").get(authenticate , getAllCategories).post(authenticate , createCategory)
router.route('/:categoryID').patch(authenticate , editCategory).delete(authenticate , deleteCategory)

module.exports = router;
