import { mongoose } from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },

    price: { type: Number, required: true },
    salePrice: { type: Number },

    stock: { type: Number, default: 0 },

    gender: { type: String, enum: ['men', 'female'], required: true },

    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },

    badge: { type: String, enum: ['new', 'hot', 'sale'], default: 'new' },

    images: [{ type: String, required: true }],

    colors: [{ type: String, required: true }],

    sizes: [{ type: String, required: true }],

    isPublished: { type: Boolean, default: true },

}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema);

export default Product;