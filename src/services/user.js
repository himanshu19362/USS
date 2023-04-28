const { UserRepository } = require('../repository/index');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { SALT } = require('./../config/serverConfig');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }    

    async getByEmail(email){
        try {
            const user = await this.userRepository.getByEmail(email);
            return user;    
        } catch (error) {
            console.log('Error in Service Layer');
            throw {error};
        }
    }

    async destroy(id){
        try {
            await this.userRepository.destroy(id);    
            return true;
        } catch (error) {
            console.log('Error in Service Layer');
            throw {error};
        }
    }

    async update(id , data){
        try {
            const user = await this.userRepository.get(id);
            if(!user){
                throw new Error('No such user is present');
            }
            
            const encryptedPassword = bcrypt.hashSync(data.password , SALT);
            await this.userRepository.update(user._id , {password : encryptedPassword});
            
            return true;
            // return user;    
        } catch (error) {
            console.log('Error in Service Layer');
            if(error.message)   console.log(error.message);
            throw error;
        }
    }

    async signup(data){
        try {
            const {name , email , password} = data;
            if(name.length < 5){
                throw new Error('Name should have atleast 5 characters');
            }
            
            if(!validator.isEmail(email)){
                throw new Error('Enter a valid Email');
            }

            const userWithEmail = await this.userRepository.getByEmail(email);
            if(userWithEmail){
                throw new Error('User with this email already exists');
            }

            let space = false;
            for(let x in password){
                if(x === ' '){
                    space = true;
                    break;
                }
            }

            if(space){
                throw new Error('The password cannot have empty spaces');
            }
            if(password.length < 8){
                throw new Error('Length of Password should be greater than 8');
            }

            // if(password != confirmPassword){
            //     throw new Error('The password and the confirmed password are not matching');
            // }

            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Error in Service Layer');
            console.log(error)
            if(error.message)   throw error.message
            throw error;
        }
    }

    async signin({email , password}){
        try {
            const user = await this.userRepository.getByEmail(email);
            if(!user){
                throw new Error('No such user present');
            }
            const verified = user.verifyPassword(password);
            if(!verified){
                throw new Error('Incorrect Password');
            }
            const token = user.getToken();
            return token;
        } catch (error) {
            console.log('Error in Service Layer');
            if(error.message)   throw error.message
            else    throw error;
        }
    }

    async verify(id , password) {
        try {
            const user = await this.userRepository.get(id);
            const x = user.verifyPassword(password);
            if(!x){
                throw new Error('Wrong password');
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
}



module.exports = UserService;
