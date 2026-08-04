import { createOrder, getUserOrders, getOrder, getAllOrders, updateOrderStatus } from "./order.service.js";

export const createOrderController = async (req, res) => {
    try {
        const order = await createOrder({
            ...req.body,
            user: req.user.id,
        });

        return res.status(201).json({
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};


export const getUserOrdersController = async (req, res) => {
    try {
        const orders = await getUserOrders(req.user.id)
        console.log("👤 USER ROUTE HIT!");


        return res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await getAllOrders();
        console.log("🔥 ADMIN ROUTE HIT!");

        return res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

export const getOrderController = async (req, res) => {
    try {
        const order = await getOrder(req.params.id, req.user.id);

        return res.status(200).json({
            message: "Order fetched successfully",
            order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}


export const updateOrderStatusController = async (req, res) => {
    try {
        const order = await updateOrderStatus(req.params.id, req.body);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        return res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}