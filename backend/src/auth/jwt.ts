import jwt from "jsonwebtoken";

const JWT_SECRET = "sweet-shop-secret"; 
export interface JwtPayload {
  userId: string;
  role: "USER" | "ADMIN";
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
