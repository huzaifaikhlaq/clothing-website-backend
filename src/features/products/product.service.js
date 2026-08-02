import Product from "./product.model.js";

const createProduct = async (productData) => {
    const existingProduct = await Product.findOne({ sku: productData.sku });

    if (existingProduct) {
        throw new Error("Product with the same SKU already exists");
    }

    if (productData.salePrice === 0 || productData.salePrice === "") {
        productData.salePrice = null;
    }

    return await Product.create(productData);;
}

const getProducts = async (filters = {}, options = {}) => {
    const { search, category, gender, badge, sort = "-createdAt", page, limit, } = options;
    const query = { ...filters };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { sku: { $regex: search, $options: "i" } }
        ]
    }

    if (category && category !== "all") {
        query.category = category;
    }

    if (gender && gender !== "all") {
        query.gender = gender;
    }

    if (badge && badge !== "all") {
        query.badge = badge;
    }

    const products = await Product.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    return {
        products,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
        },
    };
}

const getProductById = async (id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
}

const updateProduct = async (id, updateData) => {
    if (updateData.sku) {
        const existingProduct = await Product.findOne({
            sku: updateData.sku,
            _id: { $ne: id },
        });

        if (existingProduct) {
            throw new Error("Product with the same SKU already exists");
        }
    }
    
    if (updateData.salePrice === 0 || updateData.salePrice === "") {
        updateData.salePrice = null;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        throw new Error("Product not found");
    }

    return product;
}

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
}



export default { createProduct, getProducts, getProductById, updateProduct, deleteProduct };