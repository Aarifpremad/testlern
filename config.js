let dotenv = require("dotenv").config()
let port = process.env.PORT
let db = process.env.DB

module.exports={
    port:port,
    db:db
}