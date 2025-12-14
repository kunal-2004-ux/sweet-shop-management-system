import prisma from "../database/prismaClient";
import { generateToken } from "./jwt";
import bcrypt from "bcrypt";

interface RegisterInput {
  email: string;
  password: string;
  phoneNumber: string;
  role?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// Valid role values
const VALID_ROLES = ["USER", "ADMIN"] as const;
type Role = (typeof VALID_ROLES)[number];

function isValidRole(role: string): role is Role {
  return VALID_ROLES.includes(role as Role);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export class AuthService {
  async registerNewUser(input: RegisterInput) {
    // Validate email format
    if (!input.email || !isValidEmail(input.email)) {
      throw new Error("Valid email is required");
    }

    // Validate password length
    if (!input.password || input.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Validate phone number presence
    if (!input.phoneNumber) {
      throw new Error("Phone number is required");
    }

    // Validate role - default to USER if not provided
    const role = input.role || "USER";
    if (!isValidRole(role)) {
      throw new Error("Role must be either USER or ADMIN");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        phoneNumber: input.phoneNumber,
        role: role
      }
    });

    // Return user without password
    return {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    };
  }

  async loginUser(input: LoginInput) {
  if (!input.email || !input.password) {
    throw new Error("Email and password are required to login");
  }

  const user = await prisma.user.findUnique({
    where: { email: input.email }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user.id,
    role: user.role as "USER" | "ADMIN"
  });

  // ✅ THIS IS THE FIX
  return {
    token,
    role: user.role
  };
}

}
