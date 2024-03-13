const getAllCategories = async (req, res)=>{
  const response = await fetch('http://localhost:3000/categories/');
  const categories = await response.json();
  return res.status(200).json(categories);
}
const getCategory = async (req, res)=>{
  const id = req.params.id;
  const response = await fetch('http://localhost:3000/categories/'+id);
  const category = await response.json();
  return res.status(200).json(category);
}

const getAllLocations = async (req, res)=>{
  const response = await fetch('http://localhost:3000/locations/');
  const locations = await response.json();
  return res.status(200).json(locations);
}
const getLocation = async (req, res)=>{
  const id = req.params.id;
  const response = await fetch('http://localhost:3000/locations/'+id);
  const locations = await response.json();
  return res.status(200).json(location);
}

const getAllSegments = async (req, res)=>{
  const response = await fetch('http://localhost:3000/segments/');
  const segments = await response.json();
  return res.status(200).json(segments);
}
module.exports = {
  getAllCategories,
  getCategory,
  getAllLocations,
  getLocation,
  getAllSegments
}