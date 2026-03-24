const router = require("express").Router();
const Category = require("../models/category");
const authMiddleware = require("../middleware/auth")

router.post("/categories", authMiddleware, async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        if (!categoryName){
            return res.status(400).json({ message: "CategoryName required!"})
        }
        const newCategory = new Category({
            categoryName,
            description,
        })
        await newCategory.save();
        return res.status(201).json({
            message: "Category created successfully.",
            category: newCategory,
        })
    } catch(error){
        console.error(error)
        return res.status(500).json({ message: "Server error"})
    }
})

router.get("/categories", authMiddleware, async(req, res) => {
    try{
        const categories = await Category.find();
        return res.status(200).json(categories)

    }catch(error){
        console.error(error)
        return res.status(500).json({ message: "Server error"})
    }
})

router.get("/categories/:id", authMiddleware, async(req, res) => {
    try{
        const { id } = req.params;
        const category = Category.findById(id);

        if(!category){
            return res.status(404).json({ message: "Category not found" })
        }

        return res.status(200).json(category);

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error"})
    }
})

router.put("/categories/:id", authMiddleware, async(req, res) => {
    try{
        const { id } = req.params;
        const { categoryName, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(id, {
            categoryName, description }, 
            { new: true} //returns updated document
        )
        if(!updatedCategory){
            return res.status(404).json({ message: "Category not found"})
        }

        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory})

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error"})
    }
})

router.delete("/categories/:id", authMiddleware, async(req, res) => {
    try{
        const { id } = req.params;
        
        const deletedCategory = await Category.findByIdAndDelete(id)
        if(!deletedCategory){
            return res.status(404).json({ message: "Category not found" })
        }
        
        return res.status(200).json({
            message: "Category deleted successfully",
            category: deletedCategory,
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error"})
    }
})

module.exports = router;