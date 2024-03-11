const { UUID, ObjectId } = require('mongodb');
const dbPromise = require('../mongoConnection.js');

const getAllMatrix = async (req, res)=>{
  const names =[]; //array of matrixNames
  const db = await dbPromise; // get db
  const arr = await db.listCollections().toArray(); // get list of collections in db

  //get names of collections
  arr.map(el=>{
    const obj = {
      'uuid':el.info.uuid.toJSON(),
      'name': el.name
    }
    names.push(obj);
  });
  return res.status(200).json(names);
}
const getMatrix = async (req, res)=>{
  const uuid = new UUID(req.params.id);
  const page = req.params.page;

  const db = await dbPromise; // get db
  const arr = await db.listCollections().toArray(); //get list of collections in db

  const targetCollection = arr.find(el=>el.info.uuid.equals(uuid)); // find collection by id (idk why it is not actual collection)
  const coll = await db.collection(targetCollection.name); // get actual collection
  const documents = await coll.find({}).skip(page*20).limit(20).toArray(); //get firts 20 elements

  return res.status(200).json(documents);

}
const copyAndChange = async (req,res)=>{
  const {dbID, arr_obj} = req.body;
  const uuid = new UUID(dbID); // create uuid
  const db = await dbPromise; // get db
  const arr = await db.listCollections().toArray(); //get list of collections in db

  const targetCollection = arr.find(el=>el.info.uuid.equals(uuid)); // find coll by uuid (idk why it is not actual collection)
  const coll = await db.collection(targetCollection.name); // get actual coll

  if(targetCollection.name.includes('baseline')){ // check if baseline
    const randomString = (Math.random() + 1).toString(36).substring(7); //create random string
    await db.createCollection('baselineMatrix_'+randomString) //create new coll
    const copy = db.collection('baselineMatrix_'+randomString); //get this new coll
    coll.find({}).toArray().then(documents=>{
      copy.insertMany(documents).then(()=>{ // copy all documents
        arr_obj.map(async (el)=>{ // change documents
          const o_id = new ObjectId(el._id);
          await copy.updateOne({_id:o_id}, {$set: {"price": el.newPrice}});
        })
        console.log('Закончили редактирование');
        return res.status(200).json({message: "Success"})
      })
    });
  }
  //same code for discount
  if(targetCollection.name.includes('discount')){
    const randomString = (Math.random() + 1).toString(36).substring(7);
    await db.createCollection('discountMatrix_'+randomString)
    const copy = db.collection('discountMatrix_'+randomString);
    coll.find({}).toArray().then(documents=>{
      copy.insertMany(documents).then(()=>{
        arr_obj.map(async (el)=>{
          const o_id = new ObjectId(el._id);
          await copy.updateOne({_id:o_id}, {$set: {"price": el.newPrice}});
        })
        console.log('Закончили редактирование');
        return res.status(200).json({message: "Success"})
      })
    });
  }

}
module.exports = {
  getAllMatrix,
  getMatrix,
  copyAndChange
}