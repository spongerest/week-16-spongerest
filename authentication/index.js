const fs = require('fs')
const path = require('path')
const BaseAuth = require('./base')

const files = fs.readdirSync(__dirname)

const authFiles = files.filter(file => file !== 'base.js' && path.extname(file) === '.js');


const authClasses = authFiles.map(file => {
    const AuthClass = require(`./${file}`)
    if (AuthClass.prototype) {
        if(Object.getPrototypeOf(AuthClass.prototype) === BaseAuth.prototype){
            return new AuthClass()
        }
    }
}).filter(Boolean)

module.exports = {
    async authenticate (req,res,next){
        for (const authClass of authClasses){
            await authClass.authenticate(req,res,next)
        }
        next()
    }
}