const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { PORT } = require('./config/serverConfig');
const { connect } = require('./config/databaseConfig');
const apiRoutes = require('./routes/index');

const startServer = () => {
    const app = express();
    const limit = rateLimit({
        windowMs : 2 * 60 * 1000 , 
        max : 15 , 
        message: 'Please try again after 2 minutes . Too many requests made .'        
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(cors());
    app.use(limit);
    app.use('/api' , apiRoutes);
    
    app.listen(PORT , async ()=> {
        console.log(`Server running on PORT ${PORT}`);
        await connect();
        console.log('Connected to MongoDB');
    });
}

startServer();