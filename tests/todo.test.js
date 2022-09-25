const server = require("../index.js");
const supertest = require("supertest");
const request = supertest(server);
const { uuid } = require("uuidv4");

process.env.port = 4000;

const mockPayload = {
  todo: uuid(),
  dateTime: new Date(),
};
let testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RVc2VyTmV3MTIzIiwiaWF0IjoxNjY0MTE5NjAzfQ.dBlsPC8NU3YzP-WRJQ9zSnki_JqL-MnLl0FdA0utlns";
beforeAll(async () => {
  const mockPayload = {
    username: "TestUserNew123",
    password: "Test12345678",
  };
  await request.post("/users/signup").send(mockPayload);
});

describe("Todo Endpoints", () => {
  it("POST /todos should return success", async () => {
    const res = await request
      .post("/todos")
      .set("authorization", testToken)
      .send(mockPayload);
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("GET /todos should return success", async () => {
    const res = await request.get("/todos").set("authorization", testToken);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("data");
  });
});
