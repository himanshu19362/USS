const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SECRET_KEY , SALT } = require('./../config/serverConfig')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email : {
        type : String , 
        required : true , 
        unique : true
    } , 
    password : {
        type : String , 
        required : true , 
        maxLength : [30 , 'Password cannot have more than 30 characters'] , 
        minLength : [8 , 'Password should have atleast 7 characters']
    } , 
    name : {
        type : String , 
        required : true
    }   
} , {timestamps : true});

userSchema.pre('save' , function (next) {
    console.log(this.password);
    const encryptedPassword = bcrypt.hashSync(this.password , SALT);
    this.password = encryptedPassword;
    next();
});


userSchema.methods.getToken = function () {
    return jwt.sign({name : this.name , id : this._id} , SECRET_KEY , {
        expiresIn : '1h'
    });
}

userSchema.methods.verifyPassword = function (password){
    return bcrypt.compareSync(password , this.password);
}

const User = mongoose.model('User' , userSchema);

module.exports = User;