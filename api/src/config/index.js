require('dotenv').config()

const config = {
     port: process.env.PORT,
     dbUsername: process.env.DB_USERNAME,
     dbPassword: process.env.DB_PASSWORD,
     host: process.env.HOST,
     dbName: process.env.DB_NAME,
     secret: process.env.SECRET
}
 
module.exports = config

