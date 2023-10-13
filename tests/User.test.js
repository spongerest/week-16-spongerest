const UserClass = require("../models/User");

describe("User", () => {
    test("create", async () => {
        const user = await UserClass.create({ username: "blue2@blue.com", email: "blue2", password: "password1234" });
        expect(user.username).toBe("test");
        expect(user.password).not.toBe("123456");
    });
    // test("get", async () => {
    //     const user = await UserClass.get({ username: "test" });
    //     expect(user.username).toBe("test");
    // });
    // test("generateToken", async () => {
    //     const user = await UserClass.get({ username: "test" });
    //     const token = UserClass.generateToken(user);
    //     expect(token).toHaveProperty("accesToken");
    //     expect(token).toHaveProperty("refreshToken");
    //     expect(token).toHaveProperty("expireAt");
    // });
    // test("decode token", async () => {
    //     const user = await UserClass.get({ username: "test" });
    //     const token = UserClass.generateToken(user);
    //     const decoded = UserClass.parseToken(token.accesToken);
    //     expect(decoded.id).toBe(user.id);
    // });
    // test("authenticate password", async () => {
    //     const authenticated = await UserClass.authenticate("test", "123456");
    //     expect(authenticated).toBe(true);
    // });
    // test("fail authenticate password", async () => {
    //     const authenticated = await UserClass.authenticate("test", "random");
    //     expect(authenticated).toBe(false);
    // });
});
