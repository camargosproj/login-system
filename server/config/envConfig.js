const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    connetionString: process.env.DATABASE,
    jwtSecret: process.env.SECRET_TOKEN,
    port: process.env.PORT,
}