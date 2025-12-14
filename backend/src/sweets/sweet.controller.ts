import { Request, Response } from "express";
import { SweetService } from "./sweet.service";

const sweetService = new SweetService();

export const addSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await sweetService.addSweetToCatalog(req.body);
    return res.status(201).json(sweet);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllSweets = async (_req: Request, res: Response) => {
  const sweets = await sweetService.getAllSweets();
  return res.status(200).json(sweets);
};

export const searchSweets = async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const sweets = await sweetService.searchSweets({
    name: name as string | undefined,
    category: category as string | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined
  });

  return res.status(200).json(sweets);
};

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const updatedSweet = await sweetService.purchaseSweet(
      req.params.id,
      quantity !== undefined ? Number(quantity) : 1
    );
    return res.status(200).json(updatedSweet);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const updatedSweet = await sweetService.restockSweet(
      req.params.id,
      Number(amount)
    );
    return res.status(200).json(updatedSweet);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const updatedSweet = await sweetService.updateSweet(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedSweet);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    await sweetService.deleteSweet(req.params.id);
    return res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

