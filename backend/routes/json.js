//npm packages
const express = require('express');
const router = express.Router();
const {getAllCategories, getCategory, getAllLocations, getLocation, getAllSegments} = require('../controllers/jsonController');
/* ROUTES */

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategory);

router.get('/locations/', getAllLocations);
router.get('/locations/:id', getLocation);

router.get('/segments', getAllSegments)

module.exports = router;