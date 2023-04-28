const mongoose = require('mongoose');
const { MGB } = require('./serverConfig');

const connect = async () => {    
    await mongoose.connect(`mongodb+srv://himanshu-uss:${MGB}@cluster0.5jq9t0e.mongodb.net/?retryWrites=true&w=majority` , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = {
    connect
}
