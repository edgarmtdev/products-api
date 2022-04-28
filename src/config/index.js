require('dotenv').config()

const config = {
     port: process.env.PORT,
     host: process.env.HOST,
     dbName: process.env.DB_NAME,
     secret: process.env.SECRET
}
 
module.exports = config

