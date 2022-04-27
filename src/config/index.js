require('dotenv').config()

const config = {
     port: process.env.PORT,
     host: process.env.HOST,
     dbName: process.env.DB_NAME
}
 
module.exports = config

