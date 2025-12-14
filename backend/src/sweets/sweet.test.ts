import request from "supertest";
import app from "../app";
import prisma from "../database/prismaClient";

let adminToken = "";
let userToken = "";
let testSweetId = "";

// Setup: Create admin and user, get their tokens
beforeAll(async () => {
  // Clean up
  await prisma.sweet.deleteMany({});
  await prisma.user.deleteMany({});

  // Register admin
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "sweetadmin@test.com",
      password: "adminpass123",
      phoneNumber: "1111111111",
      role: "ADMIN"
    });

  // Register regular user
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "sweetuser@test.com",
      password: "userpass123",
      phoneNumber: "2222222222",
      role: "USER"
    });

  // Login admin
  const adminLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "sweetadmin@test.com",
      password: "adminpass123"
    });
  adminToken = adminLogin.body.token;

  // Login user
  const userLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "sweetuser@test.com",
      password: "userpass123"
    });
  userToken = userLogin.body.token;
});

afterAll(async () => {
  await prisma.sweet.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
});

describe("Sweet Catalog API - Admin Operations", () => {
  it("should allow ADMIN to add a new sweet", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Dessert",
        price: 25,
        quantityInStock: 100
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Gulab Jamun");
    testSweetId = response.body.id;
  });

  it("should deny USER from adding a sweet (403 Forbidden)", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Jalebi",
        category: "Dessert",
        price: 15,
        quantityInStock: 50
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Forbidden: Admin access required");
  });

  it("should allow ADMIN to update a sweet", async () => {
    const response = await request(app)
      .put(`/api/sweets/${testSweetId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        price: 30
      });

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(30);
  });

  it("should deny USER from updating a sweet (403 Forbidden)", async () => {
    const response = await request(app)
      .put(`/api/sweets/${testSweetId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        price: 35
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Forbidden: Admin access required");
  });

  it("should allow ADMIN to restock a sweet", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 50 });

    expect(response.status).toBe(200);
    expect(response.body.quantityInStock).toBe(150);
  });

  it("should deny USER from restocking a sweet (403 Forbidden)", async () => {
    const response = await request(app)
      .post(`/api/sweets/${testSweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ amount: 10 });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Forbidden: Admin access required");
  });
});

describe("Sweet Catalog API - User Operations", () => {
  it("should allow USER to view all sweets", async () => {
    const response = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should allow USER to search sweets", async () => {
    const response = await request(app)
      .get("/api/sweets/search?name=Gulab")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("Sweet Catalog API - Quantity-Based Purchase", () => {
  let purchaseSweetId = "";

  beforeAll(async () => {
    // Create a sweet for purchase tests
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Ladoo",
        category: "Dessert",
        price: 10,
        quantityInStock: 10
      });
    purchaseSweetId = response.body.id;
  });

  it("should allow purchase with specific quantity", async () => {
    const response = await request(app)
      .post(`/api/sweets/${purchaseSweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 3 });

    expect(response.status).toBe(200);
    expect(response.body.quantityInStock).toBe(7);
  });

  it("should default to quantity 1 if not specified", async () => {
    const response = await request(app)
      .post(`/api/sweets/${purchaseSweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({});

    expect(response.status).toBe(200);
    expect(response.body.quantityInStock).toBe(6);
  });

  it("should fail when quantity exceeds stock", async () => {
    const response = await request(app)
      .post(`/api/sweets/${purchaseSweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 100 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Insufficient stock available");
  });

  it("should fail when quantity is zero or negative", async () => {
    const response = await request(app)
      .post(`/api/sweets/${purchaseSweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 0 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Quantity must be greater than zero");
  });

  it("should not allow purchase when sweet is out of stock", async () => {
    // Create a sweet with 0 stock
    const createResponse = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Rasgulla",
        category: "Dessert",
        price: 12,
        quantityInStock: 0
      });

    const sweetId = createResponse.body.id;

    const purchaseResponse = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 1 });

    expect(purchaseResponse.status).toBe(400);
    expect(purchaseResponse.body.message).toBe("Insufficient stock available");
  });
});

describe("Sweet Catalog API - Delete (Admin Only)", () => {
  let deleteSweetId = "";

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Halwa",
        category: "Dessert",
        price: 40,
        quantityInStock: 10
      });
    deleteSweetId = response.body.id;
  });

  it("should deny USER from deleting a sweet (403 Forbidden)", async () => {
    const response = await request(app)
      .delete(`/api/sweets/${deleteSweetId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Forbidden: Admin access required");
  });

  it("should allow ADMIN to delete a sweet", async () => {
    const response = await request(app)
      .delete(`/api/sweets/${deleteSweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });
});
