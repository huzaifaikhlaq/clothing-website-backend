import express from "express";
import { getUserController, getAllUsersController, updateUserController, deleteUserController } from "./user.controller.js";

const router = express.Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserController);
router.patch("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;