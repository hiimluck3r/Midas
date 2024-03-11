const dbPromise = require('../mongoConnection.js');

const getAllMatrix = async (req, res)=>{
  const names =[]; //array of matrixNames
  const db = await dbPromise; // get db
  const arr = await db.listCollections().toArray(); // get list of collections in db

  //get names of collections
  arr.map(el=>{
    names.push(el.name);
  });
  return res.status(200).json(names);
}
const getMatrix = async (req, res)=>{

}
const copyAndChange = async (req,res)=>{

}
module.exports = {
  getAllMatrix,
  getMatrix,
  copyAndChange
}