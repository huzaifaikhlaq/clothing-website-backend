import Collection from "./collection.model.js";

const createCollection = async (collectionData) => {
    const collection = await Collection.create(collectionData);
    return collection;
};

const getAllCollections = async () => {
    const collections = await Collection.find({ isPublished: true });
    return collections;
};

export default { createCollection, getAllCollections };