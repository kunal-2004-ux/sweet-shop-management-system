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
