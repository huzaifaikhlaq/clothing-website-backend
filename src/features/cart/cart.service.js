import Cart from "./cart.model.js";

const calculateCartTotal = (items) => {
    return items.reduce((total, item) => {
        const price = item.product.salePrice ?? item.product.price;

        return total + (price * item.quantity);
    }, 0);
};

const getPopulatedCart = async (cartId) => {
    const cart = await Cart.findById(cartId).populate("items.product", "title price salePrice images stock");

    const totalAmount = calculateCartTotal(cart.items);

    return {
        ...cart.toObject(),
        totalAmount,
    };
};

export const addToCart = async (userId, productId, quantity, size, color) => {
    let cart = await Cart.findOne({ user: userId }).populate("items.product", "title price salePrice images stock");

    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product._id.toString() === productId && item.size === size && item.color === color);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();

    return getPopulatedCart(cart._id);
};

export const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product", "title price salePrice images stock");

    if (!cart) {
        return {
            items: [],
            totalAmount: 0
        };
    }

    const totalAmount = calculateCartTotal(cart.items);

    return {
        ...cart.toObject(),
        totalAmount
    };
};

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

    return getPopulatedCart(cart._id);
};

export const removeCartItem = async (userId, productId, size, color) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId || item.size !== size || item.color !== color);

    await cart.save();

    return getPopulatedCart(cart._id);
};

export const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = [];

    await cart.save();

    return getPopulatedCart(cart._id);
};