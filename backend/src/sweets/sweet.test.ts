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

  it("should return a list of all sweets", async () => {
    const response = await request(app).get("/api/sweets");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
it("should search sweets by name", async () => {
  const response = await request(app).get("/api/sweets/search?name=Jamun");

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

it("should purchase a sweet and reduce its quantity", async () => {
  const createResponse = await request(app)
    .post("/api/sweets")
    .send({
      name: "Ladoo",
      category: "Dessert",
      price: 10,
      quantityInStock: 2
    });

  const sweetId = createResponse.body.id;

  const purchaseResponse = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`);

  expect(purchaseResponse.status).toBe(200);
  expect(purchaseResponse.body.quantityInStock).toBe(1);
});

it("should restock a sweet and increase its quantity", async () => {
  const createResponse = await request(app)
    .post("/api/sweets")
    .send({
      name: "Barfi",
      category: "Dessert",
      price: 15,
      quantityInStock: 5
    });

  const sweetId = createResponse.body.id;

  const restockResponse = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .send({ amount: 5 });

  expect(restockResponse.status).toBe(200);
  expect(restockResponse.body.quantityInStock).toBe(10);
});
it("should not allow purchase when sweet is out of stock", async () => {
  const createResponse = await request(app)
    .post("/api/sweets")
    .send({
      name: "Rasgulla",
      category: "Dessert",
      price: 12,
      quantityInStock: 0
    });

  const sweetId = createResponse.body.id;

  const purchaseResponse = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`);

  expect(purchaseResponse.status).toBe(400);
  expect(purchaseResponse.body).toHaveProperty("message");
});

