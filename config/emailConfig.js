const nodemailer = require('nodemailer');

const { EMAIL , PASSWORD } = require('./serverConfig');

const sender = nodemailer.createTransport({
    service : 'Gmail' , 
    auth : {
        user : EMAIL , 
        pass : PASSWORD
    }
});

module.exports = sender;