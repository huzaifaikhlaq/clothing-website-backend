import Cart from "./cart.model.js";

const calculateCartTotal = (items) => {
    return items.reduce((total, item) => {
        const price = item.product.salePrice ?? item.product.price;

        return total + (price * item.quantity);
    }, 0);
};

const getPopulatedCart = async (cartId) => {
    const cart = await Cart.findById(cartId).populate("items.product", "title price salePrice images stock");

    if (!cart) {
        return {
            items: [],
            totalAmount: 0
        };
    }

    const totalAmount = calculateCartTotal(cart.items);

    return {
        ...cart.toObject(),
        totalAmount,
    };
};

const findCart = async ({ userId, guestId }) => {
    if (userId) {
        return Cart.findOne({ user: userId });
    }

    if (guestId) {
        return Cart.findOne({ guestId });
    }

    return null;
};

export const addToCart = async (userId, guestId, productId, quantity, size, color) => {
    let cart = await findCart({ userId, guestId })

    if (!cart) {
        cart = await Cart.create({
            user: userId || null,
            guestId: userId ? null : guestId,
            items: []
        });
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
    const cart = await findCart({
        userId,
        guestId
    });

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

export const updateCart = async (userId, guestId, productId, quantity, size, color) => {
    const cart = await findCart({ userId, guestId });

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

export const removeCartItem = async (userId, guestId, productId, size, color) => {
    const cart = await findCart({
        userId,
        guestId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId || item.size !== size || item.color !== color);

    await cart.save();

    return getPopulatedCart(cart._id);
};

export const clearCart = async (userId, guestId) => {
    const cart = await findCart({
        userId,
        guestId
    });

    if (!cart) {
        return {
            items: [],
            totalAmount: 0
        };
    }
    
    cart.items = [];

    await cart.save();

    return getPopulatedCart(cart._id);
};