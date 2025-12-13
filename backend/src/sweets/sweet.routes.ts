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
import { authenticate } from "../auth/auth.middleware";

const router = Router();

router.post("/", authenticate, addSweet);
router.get("/", authenticate, getAllSweets);
router.get("/search", authenticate, searchSweets);
router.post("/:id/purchase", authenticate, purchaseSweet);
router.post("/:id/restock", authenticate, restockSweet);


router.put("/:id", authenticate, updateSweet);
router.delete("/:id", authenticate, deleteSweet);

export default router;
