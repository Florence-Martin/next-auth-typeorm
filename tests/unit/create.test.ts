// // tests/unit/create.test.ts
// import { createMocks } from "node-mocks-http";
// import handler from "@/app/api/user/create";
// import { AppDataSource } from "@/lib/data-source";
// import { User } from "@/lib/entity/User";
// import { hash } from "bcrypt";

// jest.mock("@/lib/data-source", () => ({
//   AppDataSource: {
//     isInitialized: false,
//     initialize: jest.fn(),
//     getRepository: jest.fn().mockReturnValue({
//       findOneBy: jest.fn(),
//       save: jest.fn(),
//     }),
//   },
// }));

// jest.mock("bcrypt", () => ({
//   hash: jest.fn(),
// }));

// describe("User Creation API", () => {
//   it("should return 400 if required fields are missing", async () => {
//     const { req, res } = createMocks({
//       method: "POST",
//       body: {
//         email: "",
//         password: "",
//         name: "",
//       },
//     });

//     await handler(req, res);

//     expect(res._getStatusCode()).toBe(400);
//     expect(JSON.parse(res._getData())).toEqual({
//       error: "Missing required fields",
//     });
//   });

//   it("should return 400 if user already exists", async () => {
//     const { req, res } = createMocks({
//       method: "POST",
//       body: {
//         email: "test@example.com",
//         password: "password123",
//         name: "Test User",
//       },
//     });

//     AppDataSource.getRepository().findOneBy.mockResolvedValue({ id: 1 });

//     await handler(req, res);

//     expect(res._getStatusCode()).toBe(400);
//     expect(JSON.parse(res._getData())).toEqual({
//       error: "User already exists",
//     });
//   });

//   it("should create a new user and return 201", async () => {
//     const { req, res } = createMocks({
//       method: "POST",
//       body: {
//         email: "newuser@example.com",
//         password: "password123",
//         name: "New User",
//       },
//     });

//     AppDataSource.getRepository().findOneBy.mockResolvedValue(null);
//     AppDataSource.getRepository().save.mockResolvedValue({ id: 2 });
//     hash.mockResolvedValue("hashedPassword");

//     await handler(req, res);

//     expect(res._getStatusCode()).toBe(201);
//     expect(JSON.parse(res._getData())).toEqual({
//       message: "User created successfully",
//     });
//     expect(AppDataSource.getRepository().save).toHaveBeenCalledWith(
//       expect.objectContaining({
//         email: "newuser@example.com",
//         password: "hashedPassword",
//         name: "New User",
//       })
//     );
//   });

//   it("should return 405 if method is not allowed", async () => {
//     const { req, res } = createMocks({
//       method: "GET",
//     });

//     await handler(req, res);

//     expect(res._getStatusCode()).toBe(405);
//     expect(res.getHeader("Allow")).toEqual(["POST"]);
//   });
// });
