interface RegisterUserInput {
  email: string;
  password: string;
}

export class AuthService {
  registerNewUser(input: RegisterUserInput) {
    return {
      id: "user-1",
      email: input.email
    };
  }
}
