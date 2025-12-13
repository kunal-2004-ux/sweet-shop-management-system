interface AuthInput {
  email: string;
  password: string;
}

type UserRole = "USER" | "ADMIN";

export class AuthService {
  registerNewUser(input: AuthInput) {
    if (!input.email || !input.password) {
      throw new Error("Email and password are required to register");
    }

    return {
      id: "user-1",
      email: input.email,
      role: "USER" as UserRole
    };
  }

  loginUser(input: AuthInput) {
    if (!input.email || !input.password) {
      throw new Error("Email and password are required to login");
    }

    return {
      token: "dummy-jwt-token",
      role: "USER" as UserRole
    };
  }
}
