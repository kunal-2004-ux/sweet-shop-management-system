import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export const registerUser = (req: Request, res: Response) => {
  const user = authService.registerNewUser(req.body);
  return res.status(201).json(user);
};
