const sendMail = require('./../utils/sendMail');
const { UserService } = require('../services/index');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/serverConfig');

const userService = new UserService();

const signup = async (req , res) => {
    try {
        const response = await userService.signup(req.body);
        return res.status(201).json({
            success : true , 
            data : response , 
            message : 'User signed up successfully' , 
            err : {}
        });
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot Signup' , 
            err : error
        })
    }
}

const update = async (req , res) => {
    try {
        console.log(req.params.id);
        const response = await userService.update(req.params.id , req.body);
        return res.status(200).json({
            success : true , 
            data : response , 
            message : 'User updated successfully' , 
            err : {}
        });
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot update the user' , 
            err : error
        })
    }
}

const destroy = async (req , res) => {
    try {
        await userService.destroy(req.params.id);
        return res.status(200).json({
            success : true , 
            data : {} , 
            message : 'User deleted successfully' , 
            err : {}
        });
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot delete the user' , 
            err : error
        })
    }
}

const signin = async (req , res) => {
    try {
        const response = await userService.signin(req.body);
        return res.status(200).json({
            success : true , 
            data : response , 
            message : 'Signed In successfully' , 
            err : {}
        });
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot Signin' , 
            err : error
        })
    }
};


const getByEmail = async (req , res) => {
    try {
        const user = await userService.getByEmail(req.params.email);
        return res.status(200).json({
            success : true , 
            data : user , 
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot get the user' , 
            err : error
        });
    }
}

const sendEmail = async (req , res) => {
    try {
        const {email , otp} = req.body;        
        const sendEmail = await sendMail(email , 'OTP' , `The otp is ${otp} .`);
        return res.status(200).json({
            success : true , 
            message : 'OTP Sent' ,
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot send the email' , 
            err : error
        });
    }
}

const decode = (req , res) => {
    try {
        const token = req.body.tkn;
        const data = jwt.decode(token , SECRET_KEY);
        return res.status(200).json({
            success : true , 
            data : data , 
            err : {}
        })

    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot decode the token' , 
            err : error
        });
    }
}

const verify = async(req , res) => {
    try {
        const response = await userService.verify(req.body.id , req.body.password);
        return res.status(200).json({
            success : true , 
            data : response , 
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            data : {} , 
            message : 'Couldnot verify the password' , 
            err : error
        });
    }
}

module.exports = {
    signup , signin , update , getByEmail , sendEmail , update , decode , verify , destroy
}