import Cart from "./cart.model.js";

export const addToCart = async (userId, productId, quantity, size, color) => {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId && item.size === size && item.color === color);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();

    return await Cart.findById(cart._id).populate("items.product", "title price salePrice images stock");
}

export const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product", "title price salePrice images stock");
    return cart;
}


export const updateCart = async (userId, productId, quantity, size, color) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const item = cart.items.find((item) => item.product.toString() === productId && item.size === size && item.color === color);

    if (!item) {
        throw new Error("Item not found in cart");
    }

    item.quantity = quantity;

    await cart.save();

    return await Cart.findById(cart._id).populate("items.product", "title price salePrice images stock");
}

export const removeCartItem = async (userId, productId, size, color) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error("Cart not found");
    }
    
    cart.items = cart.items.filter((item) => item.product.toString() !== productId || item.size !== size || item.color !== color);

    await cart.save();

    return await Cart.findById(cart._id).populate("items.product", "title price salePrice images stock");
}

export const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = [];

    await cart.save();

    return cart;
}
