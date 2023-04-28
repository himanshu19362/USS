const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
    PORT : process.env.PORT , 
    SALT : bcrypt.genSaltSync(12) , 
    SECRET_KEY : process.env.SECRET_KEY , 
    EMAIL : process.env.EMAIL , 
    PASSWORD : process.env.PASSWORD ,
    MGB : process.env.MGB

}
