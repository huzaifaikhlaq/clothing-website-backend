import Collection from "./collection.model.js";

const createCollection = async (collectionData) => {
    const collection = await Collection.create(collectionData);
    return collection;
};

const getAllCollections = async () => {
    const collections = await Collection.find({ isPublished: true });
    return collections;
};

const getCollectionById = async (id) => {
    const collection = await Collection.findById(id);
    return collection;
};

const updateCollection = async (id, updateData) => {
    const collection = await Collection.findByIdAndUpdate(id, updateData, { new: true });
    return collection;
};

const deleteCollection = async (id) => {
    const collection = await Collection.findByIdAndDelete(id);
    return collection;
};

export default { createCollection, getAllCollections, getCollectionById, updateCollection, deleteCollection };