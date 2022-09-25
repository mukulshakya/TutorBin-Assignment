const server = require("../index.js");
const supertest = require("supertest");
const request = supertest(server);

process.env.port = 4000;

const mockPayload = {
  username: "TestUserNew123",
  password: "Test12345678",
};

describe("User Endpoints", () => {
  it("POST /users/signup should return success", async () => {
    const res = await request.post("/users/signup").send(mockPayload);
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("POST /users/login should return success", async () => {
    const res = await request.post("/users/login").send(mockPayload);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("data.token");
  });
});
