const Category = require("../module/category-module");

// create a new category
const createCategory = async (req, res) => {
  console.log(req.body)
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ status: "SUCCESS", data: category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json({ status: "SUCCESS", data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit categories
const editCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryID,
     {$set : req.body},
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete categories
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.categoryID);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    createCategory,
    getAllCategories,
    editCategory,
    deleteCategory,
}
