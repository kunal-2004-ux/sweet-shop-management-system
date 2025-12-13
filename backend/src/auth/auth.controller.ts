import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export const registerUser = (req: Request, res: Response) => {
  const user = authService.registerNewUser(req.body);
  return res.status(201).json(user);
};

export const loginUser = (req: Request, res: Response) => {
  const result = authService.loginUser(req.body);
  return res.status(200).json(result);
};
