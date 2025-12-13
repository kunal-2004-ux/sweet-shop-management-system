import request from "supertest";
import app from "../app";

describe("Authentication API - Login", () => {
  it("should login an existing user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@test.com",
        password: "password123"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("role");
  });
});
