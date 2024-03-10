require('dotenv').config();

//npm packages
const express = require('express');
const {MongoClient} = require('mongodb');
const morgan = require('morgan');
const cors = require('cors');

//own files
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/user.js');

const app = express();
const client = new MongoClient(process.env.MONGO_URI);
const database = client.db('Avito');

//Connect to db and start a server
client.connect().then(()=>{
  console.log('Db connected');
  app.listen(4000, ()=>{
    console.log('Listening');
  })
})


//middleware
app.use(cors()); // enable cors
app.use(express.json()); // get access to req body
app.use(morgan('dev')); //log req

//Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

module.exports = database;