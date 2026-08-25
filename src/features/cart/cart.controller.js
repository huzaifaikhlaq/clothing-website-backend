import { addToCart, getCart, updateCart, removeCartItem, clearCart, mergeGuestCart } from "./cart.service.js";

const getCartOwner = (req) => {
    if (req.user?.id) {
        return {
            userId: req.user.id,
            guestId: null
        };
    }

    return {
        userId: null,
        guestId: req.guestId
    };
};

export const addToCartController = async (req, res) => {
    try {
        const { userId, guestId } = getCartOwner(req);


        const { product, quantity, size, color } = req.body;

        const cart = await addToCart(userId, guestId, product, quantity, size, color);

        return res.status(200).json({ message: "Product added to cart successfully", cart });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getCartController = async (req, res) => {
    try {
        const { userId, guestId } = getCartOwner(req);

        const cart = await getCart(userId, guestId);

        return res.status(200).json({ message: "Cart fetched successfully", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const updateCartController = async (req, res) => {
    try {
        const { userId, guestId } = getCartOwner(req);

        const { product, quantity, size, color } = req.body;

        const cart = await updateCart(userId, guestId, product, quantity, size, color);

        return res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const removeCartItemController = async (req, res) => {
    try {
        const { userId, guestId } = getCartOwner(req);

        const { productID } = req.params;
        const { size, color } = req.body;

        const cart = await removeCartItem(userId, guestId, productID, size, color);

        return res.status(200).json({ message: "Item removed from cart successfully", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const clearCartController = async (req, res) => {
    try {
        const { userId, guestId } = getCartOwner(req);


        const cart = await clearCart(userId, guestId);

        return res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// ======== Merge Guest Cart ======
export const mergeGuestCartController = async (req, res) => {
    try {
        const userId = req.user?.id;
        const guestId = req.guestId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!guestId) {
            return res.status(200).json({
                message: "No guest cart found",
                cart: null
            });
        }

        const cart = await mergeGuestCart(
            userId,
            guestId
        );

        return res.status(200).json({
            message: "Guest cart merged successfully",
            cart
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            message: error.message
        });
    }
};