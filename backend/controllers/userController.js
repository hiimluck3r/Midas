const dbPromise = require('../mongoConnection.js');
const {getStorage} = require('../controllers/adminController.js');

const getPrice = async (req, res)=>{
  let {location, category, user_id} = req.body;
  var toClient = {}
  const db = await dbPromise; // get db
  const arr = await db.listCollections().toArray(); // get list of collections in db
  let response = await fetch('http://localhost:3000/users/'+user_id); //fetching json-server
  const user = await response.json(); //get uset
  const userSegments = user.segments.split(', ').sort((a, b)=>b-a); //get and sort segments
  
  response = await fetch('http://localhost:4000/api/admin/storage');
  const storage = await response.json();
  const uuidStorage = [];
  const locationStorage = [];
  const categoryStorage = [];
  //получаю uuid в правильном порядке
  for(let i = 0;i<userSegments.length;i++){
    storage.discount.map(el=>{
      const uuid = el[userSegments[i]];
      if(uuid){
        uuidStorage.push(uuid);
      }
    })
  }
  let query = {locationId:location, microcategoryId: category}
  while(true){
    if(location == 0){
      break;
    }
    response = await fetch('http://localhost:3000/locations/'+location);
    loc = await response.json();
    locationStorage.push(loc.id);
    location = loc.parent_id;
  }
  while(true){
    if(category == 0){
      break;
    }
    response = await fetch('http://localhost:3000/categories/'+category);
    cat = await response.json();
    categoryStorage.push(cat.id);
    category = cat.parent_id;
  }
  for(let u = 0;u<uuidStorage.length;u++){
    const targetCollection = arr.find(el=>el.info.uuid.equals(uuidStorage[u])); // find collection by id
    const coll = await db.collection(targetCollection.name); // get actual collection
    for(let i = 0;i<locationStorage.length;i++){
      for(let j = 0;j<categoryStorage.length;j++){
        query = {locationId:Number(locationStorage[i]), microcategoryId:Number(categoryStorage[j])};
        let document = await coll.findOne(query);
        if(document){
          toClient = {
            price: document.price,
            location_id: locationStorage[i],
            microcategory_id: categoryStorage[j],
            matrix_id: uuidStorage[u],
            user_segment_id: userSegments
          }
          return res.status(200).json(toClient);
        }
      }
    }
  }
  const bsTarget = arr.find(el=>el.info.uuid.equals(storage.baseline));
  const bsColl = await db.collection(bsTarget.name);
  for(let i = 0;i<locationStorage.length;i++){
    for(let j = 0;j<categoryStorage.length;j++){
      query = {locationId:Number(locationStorage[i]), microcategoryId:Number(categoryStorage[j])};
      let document = await bsColl.findOne(query);
      if(document){
        toClient = {
          price: document.price,
          location_id: locationStorage[i],
          microcategory_id: categoryStorage[j],
          matrix_id: storage.baseline,
          user_segment_id: userSegments
        }
        return res.status(200).json(toClient);
      }
    }
  }
}

module.exports = {
  getPrice
}