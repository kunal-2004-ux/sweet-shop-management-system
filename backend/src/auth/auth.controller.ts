import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export const registerUser = (req: Request, res: Response) => {
  try {
    const user = authService.registerNewUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = (req: Request, res: Response) => {
  try {
    const result = authService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
