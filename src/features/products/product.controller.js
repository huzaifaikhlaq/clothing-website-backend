import productService from "./product.service.js"

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);

        res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const { page, limit, sort, search, category, gender, badge } = req.query;

        const result = await productService.getProducts({}, { page, limit, sort, search, category, gender, badge });

        res.status(200).json({ message: "Products fetched successfully", result });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);

        res.status(200).json({ message: "Product fetched successfully", product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default { createProduct, getProducts, getProduct, updateProduct, deleteProduct }