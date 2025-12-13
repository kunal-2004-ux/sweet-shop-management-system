import { Router } from "express";
import { addSweet } from "./sweet.controller";

const router = Router();

router.post("/", addSweet);

export default router;
