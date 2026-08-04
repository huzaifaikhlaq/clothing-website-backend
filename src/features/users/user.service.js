import User from "../auth/auth.model.js";

export const getAllUsers = async () => {
    return await User.find().select('-password');
}

export const getUser = async (id) => {
    return await User.findById(id).select('-password');
}

export const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, { data }, { new: true });
}

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}