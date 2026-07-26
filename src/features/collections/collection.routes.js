import express from "express";
import collectionController from "./collection.controller.js";

const router = express.Router();

router.post("/", collectionController.createCollection);

router.get("/", collectionController.getAllCollections);

router.get("/:id", collectionController.getCollectionById);

router.put("/:id", collectionController.updateCollection);

router.delete("/:id", collectionController.deleteCollection);

export default router;