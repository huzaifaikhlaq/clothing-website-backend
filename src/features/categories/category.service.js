import Category from "./category.model.js";

const createCategory = async (categoryData) => {
    const category = await Category.create(categoryData);
    return category;
}

const getAllCategories = async () => {
    const categories = await Category.find({ isPublished: true });
    return categories;
}

const getCategoriesById = async (id) => {
    const category = await Category.findById(id);
    return category;
}

const updateCategory = async (id, updateData) => {
    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
    return category;
}

const deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);
    return category;
}

export default { createCategory, getAllCategories, getCategoriesById, updateCategory, deleteCategory };