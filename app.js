const express = require ('express')
const app = express()
const applyMiddleware = require('./middleware/index')
const UserClass = require('./models/User')
const { attachPerm, detachPerm } = require('./models/permissions_utils')
const { PermissionMongo } = require('./models/UserMongo')
const postrouter = require('./route/post')
const controller = require('./controllers/userController')
const permissions = require('./permission/index')
const mongoose = require("mongoose")
const { loginLimiter } = require ('./middleware/ratelimit.js')
require("dotenv").config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected MongoDB.")).catch(err => console.error("Not Connected",err));

applyMiddleware(app)


app.get('/', (req, res) => {
    console.log(req.cookies, "COOKIES");
    console.log(req.user , "USER");
    res.send('Hello MADAFAKA!');
});

app.use("/post", postrouter)

app.post("/requestreset", controller.passwordResetRequest)

app.post("/reset", controller.passwordReset)

app.post("/detachPerm", async (req,res) => {
    const { username, permission } = req.body
    const perm = await PermissionMongo.findOne({ name: permission})
    const user = await UserClass.get({ username })
    await detachPerm(user, perm)
    res.json({ message: " SUCCES" })
})

app.post("/attachperm", async (req,res) => {
    const { username, permission } = req.body
    const perm = await PermissionMongo.findOne({name:permission})
    const user = await UserClass.get({ username })
    await attachPerm(user, perm)
})

app.post('/refresh', async(req,res) => {
    const{ refreshToken } = req.body
    const user =await UserClass.parseTokenSafe(refreshToken)
    if(!user) return res.status(401).json({ message: "invalid token" })
    const responseToken = UserClass.generateToken(user)
    res.json(responseToken)
})

app.post('/login', loginLimiter, async (req,res) => {
    const { username, password } = req.body
    const user = await UserClass.get({ username })
    const is_authenticated = await UserClass.authenticate(username, password)

    if(!user || !is_authenticated) {
        res.status(401).json({ error: "Invalid Username or Password" })
        return
    }
    const responseToken = UserClass.generateToken(user)
    res.json(responseToken)
})


app.post("/login_session", controller.login_session);
app.post("/logout_session", controller.logout_session);

app.post('/user', async (req,res) => {
    const { username, email, password } = req.body
    const user = await UserClass.create({ username, email, password })
    const userPerm = await PermissionMongo.findOne({ name: "user" })
    await attachPerm(user,userPerm)
    const responseToken = UserClass.generateToken(user)
    res.json(responseToken).status(201)
})

app.get('/user',permissions.is_authenticated, async(req,res) => {
    const user = req.user
    res.json(user)
})

app.get('./adminuser', permissions.is_superuser, async (req,res) => {
    const user = req.user
    res.json(user)
})

const server = connectDB().then(() => {
    app.listen(3000, () => {
        console.log("listening for requests");
    })
})

// const server = app.listen(3000, () => {
//     console.log('App Running at https://delightful-red-cap.cyclic.app')
// })

module.exports = server
