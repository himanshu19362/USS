const sender = require('./../config/emailConfig');

const sendEmail = (to , subject , text) => {
    try {
        sender.sendMail({
            to , subject , text
        } , (error , data) => {
            if(error){
                console.log(error);
                throw error;
            }
            
        });
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = sendEmail;