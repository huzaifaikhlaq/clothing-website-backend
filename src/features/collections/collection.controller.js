import collectionService from "./collection.service.js";

const createCollection = async (req, res) => {
    try {
        const collection = await collectionService.createCollection(req.body);
        return res.status(201).json({ message: "Collection created successfully", collection });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllCollections = async (req, res) => {
    try {
        const collections = await collectionService.getAllCollections();
        return res.status(200).json({ message: "Collections fetched successfully", collections });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default { createCollection , getAllCollections };