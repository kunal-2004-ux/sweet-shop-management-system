import { Router } from "express";
import {
  addSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet,
  restockSweet
} from "./sweet.controller";

const router = Router();

router.post("/", addSweet);
router.get("/", getAllSweets);
router.get("/search", searchSweets);
router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", restockSweet);

export default router;
