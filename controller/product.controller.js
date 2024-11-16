const Product = require("../module/product-module");

// add product module
const createProduct = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
  try {
    const product = new Product({
        ...req.body,
        image : req.file.path
    });
    await product.save();
    res.status(201).json({ status: "SUCCESS", data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json({ status: "SUCCESS", data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit product
const editProduct = async (req, res) => {
 
  try {
    const {name, description , price , category} = req.body
    const updateDate = {
      name,
      description,
      price,
      category,
    }
    if(req.file) {
      updateDate.image = req.file.path
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productID,
      { $set: updateDate },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productID);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createProduct,
    getAllProducts,
    editProduct,
    deleteProduct,
}
