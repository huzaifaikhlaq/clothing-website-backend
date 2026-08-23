import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    size: { type: String, required: true },
    color: { type: String, required: true },
})

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestId: { type: String, default: null },
    items: [cartItemSchema],
}, { timestamps: true });

cartSchema.index(
    { user: 1 },
    {
        unique: true,
        partialFilterExpression: { user: { $type: "objectId" } }
    }
)

cartSchema.index(
    { guestId: 1 },
    {
        unique: true,
        partialFilterExpression: { guestId: { $type: "string" } }
    }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;