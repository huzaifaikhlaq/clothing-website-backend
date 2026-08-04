import { getUser, getAllUsers, updateUser, deleteUser } from "./user.service.js";

export const getUserController = async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        res.status(200).json("User fetched successfully", user);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json("Users fetched successfully", users);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const updateUserController = async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.status(200).json("User updated successfully", user);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(200).json("User deleted successfully", user);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}