import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

/* ---------------- REGISTER ---------------- */

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await authService.registerNewUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

/* ---------------- LOGIN ---------------- */

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await authService.loginUser(req.body);

    // result MUST contain { token, role }
    return res.status(200).json({
      token: result.token,
      role: result.role
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
