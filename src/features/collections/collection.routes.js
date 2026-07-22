import express from "express";
import collectionController from "./collection.controller.js";

const router = express.Router();

router.post("/", collectionController.createCollection);

router.get("/", collectionController.getAllCollections);

export default router;