import { Router } from "express";
import {
  addSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet,
  restockSweet,
  updateSweet,
  deleteSweet
} from "./sweet.controller";
import { authenticate, requireAdmin } from "../auth/auth.middleware";

const router = Router();

// Admin-only routes: add, update, delete, restock
router.post("/", authenticate, requireAdmin, addSweet);
router.put("/:id", authenticate, requireAdmin, updateSweet);
router.delete("/:id", authenticate, requireAdmin, deleteSweet);
router.post("/:id/restock", authenticate, requireAdmin, restockSweet);

// User routes: view, search, purchase
router.get("/", authenticate, getAllSweets);
router.get("/search", authenticate, searchSweets);
router.post("/:id/purchase", authenticate, purchaseSweet);

export default router;
