const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        images: [{ type: String }],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
