import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

import {
  getAllUsers,
  getAllListings,
  deleteUserByAdmin,
  deleteListingByAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/listings", verifyToken, verifyAdmin, getAllListings);
router.delete("/user/:id", verifyToken, verifyAdmin, deleteUserByAdmin);
router.delete("/listing/:id", verifyToken, verifyAdmin, deleteListingByAdmin);

export default router;
