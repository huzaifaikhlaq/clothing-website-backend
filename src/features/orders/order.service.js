import Order from "./order.model.js";
import Product from "../products/product.model.js"

export const createOrder = async (orderData) => {
    let calculatedTotal = 0;
    let processedItems = [];

    for (const item of orderData.items) {
        const product = await Product.findById(item.product);
        if (!product) {
            throw new Error("Product not found: ${item.product}");
        }

        const actualPrice = product.salePrice ?? product.price;

        calculatedTotal += actualPrice * item.quantity;

        processedItems.push({
            product: product._id,
            quantity: item.quantity,
            price: actualPrice,
            color: item.color,
            size: item.size,
        });
    }

    const finalOrder = {
        user: orderData.user,
        items: processedItems,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        totalAmount: calculatedTotal,
    }

    return await Order.create(finalOrder);
}

export const getUserOrders = async (userId) => {
    return await Order.find({ user: userId }).populate("items.product", "title price salePrice images stock").sort({ createdAt: -1 });
}

export const getOrder = async (orderId, userId) => {
    return await Order.findById({ _id: orderId, user: userId }).populate("items.product", "title price salePrice images stock");
}
