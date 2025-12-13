import request from "supertest";
import app from "../app";

describe("Authentication API", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "user@test.com",
        password: "password123"
      });

    expect(response.status).toBe(201);
  });
});
