import request from "supertest";
import app from "../app";

describe("Sweet Catalog API", () => {
  it("should add a new sweet to the catalog", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .send({
        name: "Gulab Jamun",
        category: "Dessert",
        price: 25,
        quantityInStock: 100
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Gulab Jamun");
  });
});
