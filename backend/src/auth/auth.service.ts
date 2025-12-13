import { generateToken } from "./jwt";

interface AuthInput {
  email: string;
  password: string;
}

export class AuthService {
  registerNewUser(input: AuthInput) {
    if (!input.email || !input.password) {
      throw new Error("Email and password are required to register");
    }

    return {
      id: "user-1",
      email: input.email,
      role: "USER"
    };
  }

  loginUser(input: AuthInput) {
    if (!input.email || !input.password) {
      throw new Error("Email and password are required to login");
    }

    const token = generateToken({
      userId: "user-1",
      role: "USER"
    });

    return { token };
  }
}
