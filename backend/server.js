require('dotenv').config();

//npm packages
const express = require('express');
const {MongoClient} = require('mongodb');
const morgan = require('morgan');
const cors = require('cors');

//own files
const dbPromise = require('./mongoConnection.js');
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/user.js');
const jsonRoutes = require('./routes/json.js')

const app = express();

dbPromise.then(
  app.listen(4000,()=>{
    console.log('Listening');
  })
)


//middleware
app.use(cors()); // enable cors
app.use(express.json()); // get access to req body
app.use(morgan('dev')); //log req

//Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/json', jsonRoutes)