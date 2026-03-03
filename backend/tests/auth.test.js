const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app");
const connectDB = require("../src/config/db");
const User = require("../src/models/user");

require("dotenv").config();

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await connectDB();
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Authentication Tests", () => {
  test("Signup should create a new user", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        name: "Test User",
        email: "test1@gmail.com",
        password: "123456"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });
  test("Test should fail with wrong password", async () => {
    const response = await request(app)
    .post("/auth/login")
    .send({
        email: "test1@gmail.com",
        password: "wrongpassword"
    });
    expect(response.statusCode).toBe(401);
  })
});