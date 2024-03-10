const {MongoClient} = require('mongodb');

const connectToMongo = async ()=>{
  const client = new MongoClient(process.env.MONGO_URI);
  try{
    await client.connect();
    console.log('Db connected');
    const db = client.db('Avito');
    return db
  } catch(err){
    console.log(err);
  }
}

module.exports = connectToMongo();