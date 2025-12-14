import request from "supertest";
import app from "../app";
import prisma from "../database/prismaClient";

// Clean up users before tests
beforeAll(async () => {
  await prisma.user.deleteMany({});
});

// Clean up after all tests
afterAll(async () => {
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
});

describe("Authentication API - Registration", () => {
  it("should register a new user with USER role (default)", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "user@test.com",
        password: "password123",
        phoneNumber: "9876543210"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("user@test.com");
    expect(response.body.phoneNumber).toBe("9876543210");
    expect(response.body.role).toBe("USER");
    expect(response.body).not.toHaveProperty("password");
  });

  it("should register a new user with ADMIN role when specified", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "admin@test.com",
        password: "password123",
        phoneNumber: "9876543211",
        role: "ADMIN"
      });

    expect(response.status).toBe(201);
    expect(response.body.role).toBe("ADMIN");
  });

  it("should default to USER when role is not provided", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "default@test.com",
        password: "password123",
        phoneNumber: "9876543212"
      });

    expect(response.status).toBe(201);
    expect(response.body.role).toBe("USER");
  });

  it("should reject invalid role values", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "invalid@test.com",
        password: "password123",
        phoneNumber: "9876543213",
        role: "SUPERUSER"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Role must be either USER or ADMIN");
  });

  it("should reject registration without phone number", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "nophone@test.com",
        password: "password123"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Phone number is required");
  });

  it("should reject registration with invalid email", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "invalid-email",
        password: "password123",
        phoneNumber: "9876543214"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Valid email is required");
  });

  it("should reject registration with short password", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "short@test.com",
        password: "123",
        phoneNumber: "9876543215"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Password must be at least 6 characters");
  });

  it("should reject duplicate email registration", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "user@test.com",
        password: "password123",
        phoneNumber: "9876543216"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User with this email already exists");
  });
});

describe("Authentication API - Login", () => {
  it("should login an existing user and return JWT", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@test.com",
        password: "password123"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should reject login with wrong password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@test.com",
        password: "wrongpassword"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should reject login with non-existent email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@test.com",
        password: "password123"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email or password");
  });
});
