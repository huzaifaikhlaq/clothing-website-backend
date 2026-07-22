import categoryService from "./category.service.js";

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(200).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ message: "Categories fetched successfully", categories });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default { createCategory, getAllCategories };