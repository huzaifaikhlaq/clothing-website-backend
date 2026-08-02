import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        price: {
            type: Number,
            required: true,
        },

        color: {
            type: String,
            required: true,
        },

        size: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [orderItemSchema,
            {
                required: true,
                min: 1,
            }],


        shippingAddress: {
            fullName: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },

            address: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            postalCode: {
                type: String,
                required: true,
            },
        },

        paymentMethod: {
            type: String,
            enum: ["Cash On Delivery", "Card", "Stripe"],
            default: "Cash On Delivery",
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;