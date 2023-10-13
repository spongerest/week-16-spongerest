const auth = require('../authentication')
module.exports = (app) => {
    app.use(auth.authenticate)
}