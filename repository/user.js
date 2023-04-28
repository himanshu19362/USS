const { User } = require('../models/index');

class UserRepository {
    async create(data){
        try { 
            console.log(data);                  
            const user = await User.create(data);
            console.log(data); 
            return user;
        } catch (error) {
            console.log('Error in Repository Layer');
            console.log(error)
            throw {error};
        }
    }

    async destroy(id){
        try {
            await User.findByIdAndDelete(id);
            return true;
        } catch (error) {
            console.log('Error in Repository Layer');
            throw {error};
        }
    }

    async update(id , data){
        try {
            const user = await User.findByIdAndUpdate(id , data , {new : true});
            return user;
        } catch (error) {
            console.log('Error in Repository Layer');
            throw {error};
        }
    }

    async get(id){
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            console.log('Error in Repository Layer');
            throw {error};
        }
    }

    async getByEmail(email){
        try {
            const user = await User.findOne({email});
            return user;
        } catch (error) {
            console.log('Error in Repository Layer');
            throw {error};
        }
    }
}

module.exports = UserRepository;