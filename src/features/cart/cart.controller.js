import { addToCart, getCart, updateCart, removeCartItem, clearCart } from "./cart.service.js";

export const addToCartController = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : req.body.user;

        if (!userId) return res.status(401).json({ message: "User not authenticated" });

        const { product, quantity, size, color } = req.body;

        const cart = await addToCart(userId, product, quantity, size, color);

        return res.status(200).json({ message: "Product added to cart successfully", cart });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
export const getCartController = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : req.body.user;

        const cart = await getCart(userId);

        return res.status(200).json({ message: "Cart fetched successfully", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const updateCartController = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : req.body.user;
        const { product, quantity, size, color } = req.body;

        const cart = await updateCart(userId, product, quantity, size, color);

        return res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


export const removeCartItemController = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : req.body.user;
        const { productID } = req.params;
        const { size, color } = req.body;

        const cart = await removeCartItem(userId, productID, size, color);

        return res.status(200).json({ message: "Item removed from cart successfully", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const clearCartController = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : req.body.user;

        const cart = await clearCart(userId);

        return res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}