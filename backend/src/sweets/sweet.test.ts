import request from "supertest";
import app from "../app";

let authToken = "";

beforeAll(async () => {
  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "password"
    });

  authToken = loginResponse.body.token;
});

describe("Sweet Catalog API", () => {
  it("should add a new sweet to the catalog", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${authToken}`)
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
    const response = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should search sweets by name", async () => {
    const response = await request(app)
      .get("/api/sweets/search?name=Jamun")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should purchase a sweet and reduce its quantity", async () => {
    const createResponse = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Ladoo",
        category: "Dessert",
        price: 10,
        quantityInStock: 2
      });

    const sweetId = createResponse.body.id;

    const purchaseResponse = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(purchaseResponse.status).toBe(200);
    expect(purchaseResponse.body.quantityInStock).toBe(1);
  });

  it("should restock a sweet and increase its quantity", async () => {
    const createResponse = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Barfi",
        category: "Dessert",
        price: 15,
        quantityInStock: 5
      });

    const sweetId = createResponse.body.id;

    const restockResponse = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ amount: 5 });

    expect(restockResponse.status).toBe(200);
    expect(restockResponse.body.quantityInStock).toBe(10);
  });

  it("should not allow purchase when sweet is out of stock", async () => {
    const createResponse = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Rasgulla",
        category: "Dessert",
        price: 12,
        quantityInStock: 0
      });

    const sweetId = createResponse.body.id;

    const purchaseResponse = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(purchaseResponse.status).toBe(400);
    expect(purchaseResponse.body).toHaveProperty("message");
  });
it("should update a sweet's details", async () => {
  const createResponse = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${authToken}`)
    .send({
      name: "Peda",
      category: "Dessert",
      price: 20,
      quantityInStock: 50
    });

  const sweetId = createResponse.body.id;

  const updateResponse = await request(app)
    .put(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${authToken}`)
    .send({
      price: 30
    });

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.price).toBe(30);
});

it("should delete a sweet", async () => {
  const createResponse = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${authToken}`)
    .send({
      name: "Halwa",
      category: "Dessert",
      price: 40,
      quantityInStock: 10
    });

  const sweetId = createResponse.body.id;

  const deleteResponse = await request(app)
    .delete(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${authToken}`);

  expect(deleteResponse.status).toBe(200);
});

});
