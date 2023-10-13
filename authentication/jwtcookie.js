const UserClass = require("../models/User");
const BaseAuth = require("./base");

class JWTAuthCookies extends BaseAuth {
    async getUser(req) {
        const token = req.cookies?.accesToken;
        if (token) {
            const _user = await UserClass.parseTokenSafe(token);
            if (!_user) return null;
            return _user;
        }
        return null;
    }
}
module.exports = JWTAuthCookies;