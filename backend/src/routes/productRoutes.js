const router = require("express").Router();
const Product = require("../models/product");
const authMiddleware = require("../middleware/auth");
const Category = require("../models/category");

router.post("/products", authMiddleware, async(req,res) =>{
    try {
        const { productName, categoryId } = req.body;
        if (!productName || !categoryId){
            return res.status(400).json({ message: "ProductName and CategoryId required!" })
        }

        //validate category exists
        const categoryExists = await Category.findById(categoryId);
        if(!categoryExists){
            return res.status(404).json({ message: "Category not found" })
        }
        const newProduct = new Product({
            productName,
            categoryId,
        })
        await newProduct.save();
        return res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" })
    }
})

//get all products
router.get("/products", authMiddleware, async(req,res) =>{
    try {
       const products = await Product.find().populate("categoryId");
       return res.status(200).json(products); 

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" })
    }
})

//get a single product
router.get("/products/:id", authMiddleware, async(req,res) =>{
    try {
      const { id } = req.params;
      const product = await Product.findById(id).populate("categoryId");
      if (!product){
        return res.status(404).json({ message: "Product not found"})
      }
      return res.status(200).json(product);

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" })
    }
})

//update product
router.put("/products/:id", authMiddleware, async(req,res) =>{
    try {
       const { id } = req.params;
       const { productName, categoryId } = req.body;

       if (categoryId) {
            const categoryExists = await Category.findById(categoryId);
            if (!categoryExists) {
                return res.status(404).json({ message: "Category not found" });
            }
        }

       const updatedProduct = await Product.findByIdAndUpdate(id, {productName, categoryId}, {new: true})
       if(!updatedProduct){
        return res.status(404).json({ message: "Product not found" })
       }

       return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
       })

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" })
    }
})

//delete a product
router.delete("/products/:id", authMiddleware, async(req,res) =>{
    try {
       const { id } = req.params;
       const deletedProduct = await Product.findByIdAndDelete(id);
       if(!deletedProduct){
        return res.status(404).json({ message: "Product not found" })
       }
       return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
       })

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" })
    }
})

module.exports=router;