//npm packages
const express = require('express');
const router = express.Router();

//Controller
const {getAllMatrix, getMatrix, copyAndChange, createStorage, getStorage} = require('../controllers/adminController.js');

/* ROUTES */

//Get names of all matrix
router.get('/', getAllMatrix);

//Get content of a single matrix
router.get('/:id/:page', getMatrix);

//Copy matrix and change it
router.post('/', copyAndChange);

//Create storage
router.post('/storage', createStorage)

//Get storage
router.get('/storage', getStorage)


module.exports = router;