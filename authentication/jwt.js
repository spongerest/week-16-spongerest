const UserClass = require("../models/User")
const BaseAuth =  require("./base")

class JwtAuth extends BaseAuth {
    async getUser(req) {
        const authHeader = req.headers.authorization;
        if (authHeader){
            const token = authHeader.split(" ")[1]
            if(token){
                const _user = await UserClass.parseTokenSafe(token)
                if(!_user) return null
                return _user
            }
        }
    }
}

module.exports = JwtAuth