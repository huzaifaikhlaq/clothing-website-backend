import Category from "./category.model.js";

const createCategory = async (categoryData) => {
    const category = await Category.create(categoryData);
    return category;
}

const getAllCategories = async () => {
    const categories = await Category.find({ isPublished: true });
    return categories;
}

export default { createCategory , getAllCategories };